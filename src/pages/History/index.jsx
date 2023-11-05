import styled from "styled-components";
// import api from '../../utils/api';

const HistoryContent = styled.div`
  margin: 20px auto;
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

const ItemName = styled.div``;

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

function History() {
  const historyData = [
    {
      id: "201807201824",
      category: "女裝",
      title: "前開衩扭結洋裝",
      image: "https://api.appworks-school.tw/assets/201807201824/main.jpg",
      price: "799",
    },
    {
      id: "201807201824",
      category: "女裝",
      title: "前開衩扭結洋裝",
      image: "https://api.appworks-school.tw/assets/201807201824/main.jpg",
      price: "799",
    },
    {
      id: "201807201824",
      category: "女裝",
      title: "前開衩扭結洋裝",
      image: "https://api.appworks-school.tw/assets/201807201824/main.jpg",
      price: "799",
    },
  ];
  return (
    <HistoryContent >
      <Header>
        <HistoryTitle>瀏覽紀錄</HistoryTitle>
      </Header>
      {historyData.map((item, index) => (
        <Items hideOnMobile key={index}>
          <Item>
            <ItemImage src={item.image} />
            <ItemName>{item.title}</ItemName>
            <ItemCatagory>{item.category}</ItemCatagory>
            <ItemID>{item.id}</ItemID>
            <ItemUnitPriceValue>NT.{item.price}</ItemUnitPriceValue>
          </Item>
        </Items>
      ))}
      {historyData.map((item, index) => (
        <ItemMobile hideOnDesktop>
          <ItemImage src={item.image} />
          <ItemDetails hideOnDesktop key={index}>
            <ItemName>{item.title}</ItemName>
            <ItemCatagory>{item.category}</ItemCatagory>
            <ItemID>{item.id}</ItemID>
            <ItemUnitPriceValue>NT.{item.price}</ItemUnitPriceValue>
          </ItemDetails>
        </ItemMobile>
      ))}
    </HistoryContent>
  );
}

export default History;
