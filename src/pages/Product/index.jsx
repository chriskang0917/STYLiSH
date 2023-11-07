import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import api from "../../utils/api";
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

const GoogleMap = styled(Story)``;
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
  margin: 30px 0 0;

  @media screen and (max-width: 1279px) {
    margin: 20px 24px 0;
    width: 100%;
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

const FAKE_SHOP_STOCKS = {
  color_code: "#FFFFFF",
  size: "M",
  shopStocks: [
    {
      id: 6,
      name: "台北車站館前店",
      lat: "25.045749558028554",
      lng: "121.51477021384437",
      address: "台北市中正區館前路12號",
      phone: "(02)2331-5806",
      open_time: "11:00",
      close_time: "22:00",
      stock: 10,
    },
    {
      id: 7,
      name: "西門店",
      lat: "25.044023639710836",
      lng: "121.50711269664501",
      address: "台北市萬華區漢中街52號",
      phone: "(02)2331-4828",
      open_time: "11:00",
      close_time: "11:00",
      stock: 9,
    },
    {
      id: 8,
      name: "Global Mall  新北中和店",
      lat: "25.006886285840675",
      lng: "121.47485399849825",
      address: "新北市中和區中山路三段122號",
      phone: "(02)3234-7604",
      open_time: "11:00",
      close_time: "22:00",
      stock: 9,
    },
    {
      id: 9,
      name: "中壢中華路店",
      lat: "24.96886585202906",
      lng: "121.2493434678071",
      address: "桃園市中壢區中華路一段699號",
      phone: "(03)461-2137",
      open_time: "11:00",
      close_time: "22:00",
      stock: 3,
    },
    {
      id: 10,
      name: "皮卡丘旗艦店",
      lat: "25.02143530092362",
      lng: "121.55607186631653",
      address: "台北市信義區和平東路三段319號",
      phone: "(03)2331-0857",
      open_time: "09:00",
      close_time: "09:30",
      stock: 4,
    },
  ],
};

function Product() {
  const [product, setProduct] = useState();
  const { id } = useParams();

  useEffect(() => {
    async function getProduct() {
      const { data } = await api.getProduct(id);
      setProduct(data);
    }
    getProduct();
  }, [id]);

  useEffect(() => {
    async function getShopStocks() {
      const { data } = await api.getShopStocks(id);
      console.log(data);
    }
    getShopStocks();
  }, [id]);

  if (!product) return null;

  return (
    <Wrapper>
      <MainImage src={`https://handsomelai.shop${product.main_image}`} />
      <Details>
        <Title>{product.title}</Title>
        <ID>{product.id}</ID>
        <Price>TWD.{product.price}</Price>
        <ProductVariants product={product} />
        <Note>{product.note}</Note>
        <Texture>{product.texture}</Texture>
        <Description>{product.description}</Description>
        <Place>素材產地 / {product.place}</Place>
        <Place>加工產地 / {product.place}</Place>
      </Details>
      <GoogleMap>
        <GoogleMapTitle>實體商店庫存</GoogleMapTitle>
        <GoogleMapContent>
          僅會顯示各店舖中，特定商品指定的顏色與尺寸數量。若有不確定的細節，請與客服確認。
        </GoogleMapContent>
        <ShopDetails>
          {FAKE_SHOP_STOCKS.shopStocks.map((shopStock) => (
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
          ))}
        </ShopDetails>
      </GoogleMap>
      <Story>
        <StoryTitle>細部說明</StoryTitle>
        <StoryContent>{product.story}</StoryContent>
      </Story>
      <Images>
        {product.images.map((image, index) => (
          <Image src={`https://handsomelai.shop${image}`} key={index} />
        ))}
      </Images>
    </Wrapper>
  );
}

export default Product;
