import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import api from "../../utils/api";
const Product = styled(Link)`
  width: calc((100% - 120px) / 3);
  margin: 0 20px 50px;
  flex-shrink: 0;
  text-decoration: none;
  @media screen and (max-width: 1279px) {
    width: calc((100% - 12px) / 2);
    margin: 0 3px 24px;
  }
`;

const ProductImage = styled.img`
  width: 100%;
  vertical-align: middle;
`;

const ProductColors = styled.div`
  margin-top: 20px;
  display: flex;
  align-items: center;

  @media screen and (max-width: 1279px) {
    margin-top: 6px;
  }
`;

const ProductTitle = styled.div`
  margin-top: 20px;
  font-size: 20px;
  letter-spacing: 4px;
  color: #3f3a3a;
  line-height: 24px;

  @media screen and (max-width: 1279px) {
    margin-top: 10px;
    font-size: 12px;
    letter-spacing: 2.4px;
    line-height: 14px;
  }
`;

const ProductPrice = styled.div`
  margin-top: 10px;
  font-size: 20px;
  letter-spacing: 4px;
  color: #3f3a3a;
  line-height: 24px;

  @media screen and (max-width: 1279px) {
    margin-top: 8px;
    font-size: 12px;
    letter-spacing: 2.4px;
    line-height: 14px;
  }
`;
const ProgressValue = styled.div`
  font-size: 24px;
  margin: 0px 0px 0px 5px;
  color: #000000;
  @media screen and (max-width: 1279px) {
    font-size: 14px;
    line-height: 14px;
  }
`;
const ProgressBar = styled.div`
  font-size: 0px;
  width: 90%;
  height: 24px;
  padding: 2px;
  border: 1px solid #000000;
  border-radius: 12px;
  @media screen and (max-width: 1279px) {
    height: 14px;
    border-radius: 7px;
  }
`;
const ProgressBarInner = styled.div`
  height: 100%;
  width: ${(props) => (props.progress > 100 ? 100 : props.progress)}%;
  border-radius: 10px;
  background-color: #313538;
`;

const Sticker = styled.div`
  background-color: ${(props) =>
    props.progress > 100 ? "#8B572A" : "#313538"};
  color: white;
  font-size: 16px;
  line-height: 16px;
  padding: 8px;
  border-radius: 5px;
  position: absolute;
`;

function PreOrder() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function getNewProducts() {
      const { data } = await api.getNewProducts();
      setProducts(data);
    }
    getNewProducts();
  }, []);

  return (
    <>
      {products.map(({ id, main_image, progress, title, price }) => (
        <Product key={id} to={`/products/${id}`}>
          <Sticker progress={progress}>
            {progress > 100 ? "即將發售" : "商品預購中"}
          </Sticker>
          <ProductImage src={main_image} />
          <ProductColors>
            <ProgressBar>
              <ProgressBarInner progress={progress}></ProgressBarInner>
            </ProgressBar>
            <ProgressValue>{progress.toFixed(1)}%</ProgressValue>
          </ProductColors>
          <ProductTitle>{title}</ProductTitle>
          <ProductPrice>TWD.{price}</ProductPrice>
        </Product>
      ))}
    </>
  );
}

export default PreOrder;
