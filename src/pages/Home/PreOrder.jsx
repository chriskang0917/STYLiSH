import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import api from "../../utils/api";
// import bearMain from "./bearMain.png";
// import dogMain from "./dogMain.png";
// import sharkMain from "./sharkMain.png";
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
  background-color: #000000;
`;
const Sticker = styled.div`
  background-color: #313538;
  color: white;
  font-size: 16px;
  line-height: 16px;
  padding: 8px;
  border-radius: 5px;
  position: absolute;
`;
const fakeData = {
  data: [
    {
      id: 1234,
      category: "preorder",
      title: "真的是IKEA狗狗",
      description: "會坐不會站",
      price: 699,
      texture: "聚脂纖維",
      wash: "手洗（水溫40度",
      place: "韓國",
      note: "實品顏色以單品照為主",
      story: "你絕對有看過",
      target: 69900,
      accumulate: 60000,
      progress: 2000,
      colors: [
        {
          code: "D4C2A4",
          name: "狗狗黃",
        },
      ],
      sizes: ["F"],

      // main_image: `${dogMain}`,
      images: [
        "https://www.ikea.com.tw/dairyfarm/tw/images/768/0876835_PE611246_S4.webp",
        "https://www.ikea.com.tw/dairyfarm/tw/images/331/0933106_PH167496_S4.webp",
      ],
    },
    {
      id: 1235,
      category: "preorder",
      title: "真的是IKEA鯊魚",
      description: "會躺不會游",
      price: 699,
      texture: "聚脂纖維",
      wash: "手洗（水溫40度",
      place: "韓國",
      note: "實品顏色以單品照為主",
      story: "你絕對有看過",
      target: 69900,
      accumulate: 35000,
      progress: 50,
      colors: [
        {
          code: "498698",
          name: "鯊魚藍",
        },
      ],
      sizes: ["F"],

      // main_image: `${sharkMain}`,
      images: [
        "https://www.ikea.com.tw/dairyfarm/tw/images/773/0877368_PE633607_S4.webp",
        "https://www.ikea.com.tw/dairyfarm/tw/images/773/0877371_PE633608_S4.webp",
      ],
    },
    {
      id: 1236,
      category: "preorder",
      title: "真的是IKEA棕熊",
      description: "灰熊厲害",
      price: 899,
      texture: "聚脂纖維",
      wash: "手洗（水溫40度",
      place: "韓國",
      note: "實品顏色以單品照為主",
      story: "你絕對有看過",
      target: 89900,
      accumulate: 35000,
      progress: 20,
      colors: [
        {
          code: "633420",
          name: "熊熊棕",
        },
      ],
      sizes: ["F"],

      // main_image: `${bearMain}`,
      images: [
        "https://www.ikea.com.tw/dairyfarm/tw/images/771/0877174_PE662335_S4.webp",
        "https://www.ikea.com.tw/dairyfarm/tw/images/771/0877178_PE662336_S4.webp",
      ],
    },
  ],
};

function PreOrder() {
  const [products, setProducts] = useState([]);

  // const [searchParams] = useSearchParams();
  // const keyword = searchParams.get("keyword");
  // const category = searchParams.get("category") || "all";

  useEffect(() => {
    async function getNewProducts() {
      const { data } = await api.getNewProducts();
      setProducts(data);
    }
    getNewProducts();
  }, []);

  // async function fetchProducts() {
  //   isFetching = true;
  //   const response = keyword
  //     ? await api.searchProducts(keyword, nextPaging)
  //     : await api.getProducts(category, nextPaging);
  //   if (nextPaging === 0) {
  //     setProducts(response.data);
  //   } else {
  //     setProducts((prev) => [...prev, ...response.data]);
  //   }
  //   nextPaging = response.next_paging;
  //   isFetching = false;
  // }

  // async function scrollHandler() {
  //   if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
  //     if (nextPaging === undefined) return;
  //     if (isFetching) return;

  //     fetchProducts();
  //   }
  // }

  // fetchProducts();

  // window.addEventListener("scroll", scrollHandler);

  //   return () => {
  //     window.removeEventListener("scroll", scrollHandler);
  //   };

  return (
    <>
      {products.map(({ id, main_image, progress, title, price }) => (
        <Product key={id} to={`/products/${id}`}>
          <Sticker>{progress > 100 ? "即將發售" : "商品預購中"}</Sticker>
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
