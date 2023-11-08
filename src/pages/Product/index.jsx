import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import api from "../../utils/api";
import GoogleMap from "./GoogleMap";
import ProductVariants from "./ProductVariants";

const Wrapper = styled.div`
  max-width: 960px;
  margin: 0 auto;
  padding: 65px 0 49px;
  display: flex;
  flex-wrap: wrap;

  @media screen and (max-width: 1279px) {
    padding: 0 0 32px;
  }
`;

const MainImage = styled.img`
  width: 560px;
  object-fit: contain;
  @media screen and (max-width: 1279px) {
    width: 100%;
  }
`;

const Details = styled.div`
  margin-left: 42px;
  flex-grow: 1;

  @media screen and (max-width: 1279px) {
    margin: 17px 24px 0;
  }
`;

const Title = styled.div`
  line-height: 38px;
  font-size: 32px;
  letter-spacing: 6.4px;
  color: #3f3a3a;

  @media screen and (max-width: 1279px) {
    line-height: 24px;
    font-size: 20px;
    letter-spacing: 4px;
  }
`;

const ID = styled.div`
  line-height: 24px;
  margin-top: 16px;
  font-size: 20px;
  letter-spacing: 4px;
  color: #bababa;

  @media screen and (max-width: 1279px) {
    line-height: 19px;
    margin-top: 10px;
    font-size: 16px;
    letter-spacing: 3.2px;
  }
`;

const Price = styled.div`
  line-height: 36px;
  margin-top: 40px;
  font-size: 30px;
  color: #3f3a3a;
  padding-bottom: 20px;
  border-bottom: 1px solid #3f3a3a;

  @media screen and (max-width: 1279px) {
    line-height: 24px;
    margin-top: 20px;
    font-size: 20px;
    padding-bottom: 10px;
  }
`;

const Detail = styled.div`
  line-height: 30px;
  font-size: 20px;
  color: #3f3a3a;

  @media screen and (max-width: 1279px) {
    line-height: 24px;
    font-size: 14px;
  }
`;

const Note = styled(Detail)`
  margin-top: 40px;

  @media screen and (max-width: 1279px) {
    margin-top: 28px;
  }
`;

const Texture = styled(Detail)`
  margin-top: 30px;

  @media screen and (max-width: 1279px) {
    margin-top: 24px;
  }
`;

const Description = styled(Detail)`
  white-space: pre;
`;

const Place = styled(Detail)`
  ${Description} + & {
    margin-top: 30px;

    @media screen and (max-width: 1279px) {
      margin-top: 24px;
    }
  }
`;

const Story = styled.div`
  margin: 50px 0 0;
  width: 100%;

  @media screen and (max-width: 1279px) {
    margin: 28px 24px 0;
  }
`;

const StoryTitle = styled.div`
  line-height: 30px;
  font-size: 20px;
  letter-spacing: 4px;
  color: #8b572a;
  display: flex;
  align-items: center;

  @media screen and (max-width: 1279px) {
    font-size: 16px;
    letter-spacing: 3.2px;
  }

  &::after {
    content: "";
    height: 1px;
    flex-grow: 1;
    background-color: #3f3a3a;
    margin-left: 64px;

    @media screen and (max-width: 1279px) {
      margin-left: 35px;
    }
  }
`;

const StoryContent = styled.div`
  line-height: 30px;
  margin-top: 28px;
  font-size: 20px;
  color: #3f3a3a;

  @media screen and (max-width: 1279px) {
    line-height: 25px;
    margin-top: 12px;
    font-size: 14px;
  }
`;

const GoogleMapContainer = styled(Story)``;
const GoogleMapTitle = styled(StoryTitle)``;
const GoogleMapContent = styled(StoryContent)``;

const ShopDetails = styled.div`
  margin-top: 24px;
  padding: 20px 16px;
  display: grid;
  row-gap: 22px;
  background-color: #f3f3f3;

  @media screen and (min-width: 1279px) {
    display: none;
  }
`;

const ShopDetail = styled.div`
  display: grid;
  grid-template-columns: 3fr 1fr;
  background-color: #fff;
  position: relative;
`;

const ShopContent = styled.div`
  margin-left: 15px;
  padding: 16px 0;
`;

const ShopTitle = styled.h2`
  font-size: 16px;
  font-weight: 700;
  margin-top: 11px;
  margin-bottom: 6px;
`;

const ShopAddress = styled.h3`
  font-size: 14px;
  line-height: 30px;
`;

const ShopTime = styled.p`
  font-size: 14px;
  line-height: 30px;
`;

const ShopPhone = styled.p`
  font-size: 14px;
  line-height: 30px;
`;

const ShopStockWrapper = styled.p`
  display: flex;
  justify-content: center;
  align-items: center;

  &::before {
    content: "";
    height: calc(100% - 40px);
    margin: 20px 0;
    width: 2px;
    display: block;
    background-color: #cccccc;
    position: absolute;
    right: calc(30% - 50px);
    top: 0;
  }
`;

const ShopStock = styled.span`
  font-size: 20px;
  font-weight: 700;
`;

const Images = styled.div`
  width: 1160px;
  margin-top: 30px 0 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  @media screen and (max-width: 1279px) {
    margin: 20px 24px 0;
    width: 100%;
  }
`;

const MapContainer = styled.div`
  @media screen and (max-width: 1279px) {
    width: 100%;
  }

  & + & {
    margin-top: 30px;

    @media screen and (max-width: 1279px) {
      margin-top: 20px;
    }
  }
`;

const Image = styled.img`
  @media screen and (max-width: 1279px) {
    width: 100%;
  }

  & + & {
    margin-top: 30px;

    @media screen and (max-width: 1279px) {
      margin-top: 20px;
    }
  }
`;

function Product() {
  const [product, setProduct] = useState();
  const { id } = useParams();
  const [mapTargetProduct, setMapTargetProduct] = useState({
    color: "",
    size: "",
  });
  const setMapTarget = (color, size) => {
    setMapTargetProduct({
      color: color,
      size: size,
    });
  };

  useEffect(() => {
    async function getProduct() {
      const { data } = await api.getProduct(id);
      setProduct(data);
    }
    async function getNewProducts() {
      const { data } = await api.getNewProducts();
      const targetData = data.filter((obj) => obj.id.toString() === id);
      // console.log("id", id);
      setProduct(targetData[0]);
      // console.log(product);
    }
    if (id < 1234) {
      getProduct();
    } else {
      getNewProducts();
    }
  }, [id]);

  const [stock, setStock] = useState([]);

  useEffect(() => {
    async function getStock() {
      const { data } = await api.getStock(id);
      const selectShopStocks = [...data].filter(
        (obj) =>
          obj.color_code === mapTargetProduct.color &&
          obj.size === mapTargetProduct.size
      );

      setStock(selectShopStocks[0].shopStocks);
    }
    getStock();
  }, [id, mapTargetProduct]);

  if (!product) return null;
  if (!stock) return null;
  // console.log("product", product);

  const hasShopDetail = stock.length > 0;

  return (
    <Wrapper>
      <MainImage
        src={
          id > 1233
            ? product.main_image
            : `https://handsomelai.shop${product.main_image}`
        }
      />
      {/* <MainImage src={`https://handsomelai.shop${product.main_image}`} /> */}
      <Details>
        <Title>{product.title}</Title>
        <ID>{product.id}</ID>
        <Price>TWD.{product.price}</Price>
        <ProductVariants
          product={product}
          mapTargetProduct={mapTargetProduct}
          setMapTarget={setMapTarget}
        />
        <Note>{product.note}</Note>
        <Texture>{product.texture}</Texture>
        <Description>{product.description}</Description>
        <Place>素材產地 / {product.place}</Place>
        <Place>加工產地 / {product.place}</Place>
      </Details>

      {id > 1233 ? null : (
        <GoogleMapContainer>
          <GoogleMapTitle>實體商店庫存</GoogleMapTitle>
          <GoogleMapContent>
            僅會顯示各店舖中，特定商品指定的顏色與尺寸數量。若有不確定的細節，請與客服確認。
          </GoogleMapContent>
          <MapContainer style={{ marginTop: "24px" }}>
            <GoogleMap mapTargetProduct={mapTargetProduct} />
          </MapContainer>
          {hasShopDetail ? (
            stock.map((shopStock) => (
              <ShopDetails>
                <ShopDetail key={shopStock.lat}>
                  <ShopContent>
                    <ShopTitle>{shopStock.name}</ShopTitle>
                    <ShopAddress>{shopStock.address}</ShopAddress>
                    <ShopTime>
                      營業時間：{shopStock.open_time} - {shopStock.close_time}
                    </ShopTime>
                    <ShopPhone>聯絡方式：{shopStock.phone}</ShopPhone>
                  </ShopContent>
                  <ShopStockWrapper>
                    <ShopStock>{shopStock.stock} 件</ShopStock>
                  </ShopStockWrapper>
                </ShopDetail>
              </ShopDetails>
            ))
          ) : (
            <p>請先選擇顏色與尺寸。</p>
          )}
        </GoogleMapContainer>
      )}

      <Story>
        <StoryTitle>細部說明</StoryTitle>
        <StoryContent>{product.story}</StoryContent>
      </Story>

      <Images>
        {product.images.map((image, index) => (
          <Image
            src={id > 1233 ? image : `https://handsomelai.shop${image}`}
            key={index}
          />
        ))}
      </Images>
    </Wrapper>
  );
}

export default Product;
