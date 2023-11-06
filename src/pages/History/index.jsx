import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { AuthContext } from "../../context/authContext";
import api from "../../utils/api";

const HistoryContent = styled.div`
  margin: 20px auto;
`;
const Linkto = styled(Link)`
  display: flex;
  margin: auto auto;
  text-decoration: none;
`;
const Header = styled.div`
  display: flex;
  margin: 20px 200px;
  @media screen and (max-width: 1279px) {
    margin: 0px 60px;
    padding-bottom: 10px;
    border-bottom: 1px solid #3f3a3a;
  }
`;
const HistoryTitle = styled.div`
  flex-grow: 1;
`;

const Items = styled.div`
  padding: 20px 20px;
  margin: 20px 200px;
  border: solid 1px #979797;

  @media screen and (max-width: 1279px) {
    ${(props) => props.hideOnMobile && "display: none;"}
  }
`;

const Item = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  @media screen and (max-width: 1279px) {
    align-items: flex-start;
    flex-wrap: wrap;
    padding-bottom: 20px;
    border-bottom: 1px solid #3f3a3a;
    font-size: 14px;
    line-height: 17px;
  }

  & + & {
    margin-top: 30px;

    @media screen and (max-width: 1279px) {
      margin-top: 20px;
    }
  }
`;
const ItemMobile = styled.div`
  ${(props) => props.hideOnDesktop && "display: none;"}
  @media screen and (max-width: 1279px) {
    display: flex;
    align-items: flex-start;
    flex-wrap: wrap;
    padding: 20px 0px;
    border-bottom: 1px solid #3f3a3a;
    font-size: 14px;
    line-height: 17px;
    margin: auto 60px;
  }
`;

const ItemImage = styled.img`
  width: 114px;

  @media screen and (max-width: 1279px) {
    order: 1;
  }
`;

const ItemName = styled(Link)`
  text-decoration: none;
`;

const ItemID = styled.div``;

const ItemCatagory = styled.div``;

const ItemDetails = styled.div`
  ${(props) => props.hideOnDesktop && "display: none;"}

  @media screen and (max-width: 1279px) {
    display: grid;
    margin-left: 20px;

    order: 1;
  }
`;

const ItemUnitPriceValue = styled.div`
  @media screen and (max-width: 1279px) {
    margin-top: 20px;
  }
`;
const BackToProductPage = styled.button`
  width: 140px;
  height: 32px;
  background-color: #000;
  cursor: pointer;
  border: none;

  display: flex;
  margin: 30vh auto;
`;

const BackToProductPageA = styled.p`
  color: #fff;
  font-size: 15px;
  line-height: 30px;
  letter-spacing: 4px;
  font-family: "Noto Sans TC", sans-serif;
  margin: auto auto;
`;
function History() {
  const [product, setProduct] = useState([]);

  useEffect(() => {
    async function getHistory() {
      const { data } = await api.getHistory();
      setProduct(data);
    }
    getHistory();
  }, []);
  const tokenLocalStorage = localStorage.getItem("jwtToken");
  console.log(tokenLocalStorage);
  const [loading, setLoading] = useState(false);
  const { jwtToken, isLogin, login } = useContext(AuthContext);
  return (
    <HistoryContent>
      {jwtToken ? (
        <>
          <Header>
            <HistoryTitle>瀏覽紀錄</HistoryTitle>
          </Header>

          {product.map((item, index) => (
            <Items hideOnMobile key={index}>
              <Item>
                <ItemImage src={`https://handsomelai.shop${item.main_image}`} />
                <ItemName key={item.id} to={`/products/${item.id}`}>
                  {item.title}
                </ItemName>
                <ItemCatagory>{item.category}</ItemCatagory>
                <ItemID>{item.id.toString()}</ItemID>
                <ItemUnitPriceValue>
                  NT.{item.price.toString()}
                </ItemUnitPriceValue>
              </Item>
            </Items>
          ))}

          {product.map((item, index) => (
            <ItemMobile hideOnDesktop>
              <ItemImage src={`https://handsomelai.shop${item.main_image}`} />
              <ItemDetails hideOnDesktop key={index}>
                <ItemName key={item.id} to={`/products/${item.id}`}>
                  {item.title}
                </ItemName>
                <ItemCatagory>{item.category}</ItemCatagory>
                <ItemID>{item.id.toString()}</ItemID>
                <ItemUnitPriceValue>
                  NT.{item.price.toString()}
                </ItemUnitPriceValue>
              </ItemDetails>
            </ItemMobile>
          ))}
        </>
      ) : (
        <BackToProductPage to="/profile">
          <Linkto to="/profile">
            <BackToProductPageA>移駕到登入頁</BackToProductPageA>
          </Linkto>
        </BackToProductPage>
      )}
    </HistoryContent>
  );
}

export default History;
