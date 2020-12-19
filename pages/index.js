import Head from "next/head";
import Link from "next/link";
import "tailwindcss/tailwind.css";

import { fromImageToUrl, API_URL } from "../utils/urls";
import { twoDecimals } from "../utils/format";

export default function Home({ products }) {
  return (
    <div className=" max-w-2xl m-auto pt-18 pb-18 pr-9 pl-9">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {products.map((product) => (
        <div key={product.name} className="p-24 text-lg ">
          <Link href={`/products/${product.slug}`}>
            <a>
              <div className="flex space-x-4 ">
                <div>
                  {" "}
                  <img
                    className="flex-1 w-16 h-auto mr-8"
                    src={fromImageToUrl(product.image)}
                    alt="product image"
                  />
                </div>
                <div className="">
                  {product.name} - ${twoDecimals(product.price)}
                </div>
              </div>
            </a>
          </Link>
        </div>
      ))}
    </div>
  );
}

export async function getStaticProps() {
  //Fetch the products
  const product_res = await fetch(`${API_URL}/products/`);
  const products = await product_res.json();
  //return the product as props

  return {
    props: {
      products,
    },
  };
}
