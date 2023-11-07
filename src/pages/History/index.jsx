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
  color: #8b572a;
`;

const ItemID = styled.div``;

const ItemCatagory = styled.div``;

const ItemDetails = styled.div`
  ${(props) => props.hideOnDesktop && "display: none;"}

  @media screen and (max-width: 1279px) {
    display: grid;
    margin-left: 20px;
    height: 152px;
    align-content: space-between;
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
  margin: 30px auto;
  display: flex;
`;

const BackToProductPageA = styled.p`
  color: #fff;
  font-size: 15px;
  line-height: 30px;
  letter-spacing: 4px;
  font-family: "Noto Sans TC", sans-serif;
  margin: auto auto;
`;
const Notice = styled.div`
  color: #ccc;
  display: flex;
  letter-spacing: 4px;
  font-family: "Noto Sans TC", sans-serif;
  margin: auto auto;
`;
const NoticeContent = styled.h1`
  color: #ccc;
  letter-spacing: 4px;
  font-family: "Noto Sans TC", sans-serif;
  font-size: 30px;
  margin: auto auto;
`;

const NoticeContainer = styled.div`
  margin: 25vh auto;
  display: block;
`;

function History() {
  const [product, setProduct] = useState([]);

  useEffect(() => {
    async function getHistory() {
      const { records } = await api.getHistory();

      setProduct(records);
    }
    getHistory();
  }, []);

  const tokenLocalStorage = localStorage.getItem("jwtToken");

  const { jwtToken } = useContext(AuthContext);
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
                <ItemImage
                  src={`https://handsomelai.shop${item.data.main_image}`}
                />
                <ItemName key={item.data.id} to={`/products/${item.data.id}`}>
                  {item.data.title}
                </ItemName>
                <ItemCatagory>{item.data.category}</ItemCatagory>
                <ItemID>id:{item.data.id.toString()}</ItemID>
                <ItemUnitPriceValue>
                  NT.{item.data.price.toString()}
                </ItemUnitPriceValue>
              </Item>
            </Items>
          ))}

          {product.map((item, index) => (
            <ItemMobile hideOnDesktop>
              <ItemImage
                src={`https://handsomelai.shop${item.data.main_image}`}
              />
              <ItemDetails hideOnDesktop key={index}>
                <ItemName key={item.data.id} to={`/products/${item.data.id}`}>
                  {item.data.title}
                </ItemName>
                <ItemCatagory>{item.data.category}</ItemCatagory>
                <ItemID>id:{item.data.id.toString()}</ItemID>
                <ItemUnitPriceValue>
                  NT.{item.data.price.toString()}
                </ItemUnitPriceValue>
              </ItemDetails>
            </ItemMobile>
          ))}
        </>
      ) : (
        <NoticeContainer>
          <Notice>
            <NoticeContent>登入後即可查看瀏覽資訊！</NoticeContent>
          </Notice>

          <BackToProductPage to="/profile">
            <Linkto to="/profile">
              <BackToProductPageA>移駕到登入頁</BackToProductPageA>
            </Linkto>
          </BackToProductPage>
        </NoticeContainer>
      )}
    </HistoryContent>
  );
}

export default History;
