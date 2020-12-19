import Head from "next/head";
import { fromImageToUrl, API_URL } from "../../utils/urls";
import { twoDecimals } from "../../utils/format";
import "tailwindcss/tailwind.css";

const Product = ({ product }) => {
  return (
    <div>
      <Head>
        {product.meta_title && <title>{product.meta_title}</title>}
        {product.meta_description && (
          <meta name="description" content={product.meta_description} />
        )}
      </Head>
      <div className="container max-w-screen-md h-screen mx-auto flex flex-col justify-center items-center ">
        <div className=" flex flex-col justify-center items-start w-96 h-full ">
          <h3>{product.name}</h3>
          <img src={fromImageToUrl(product.image)} />
          <h3>{product.name}</h3>
          <p>${twoDecimals(product.price)}</p>
          <p>{product.content}</p>
        </div>
      </div>
    </div>
  );
};

export default Product;

export async function getStaticProps({ params: { slug } }) {
  const product_res = await fetch(`${API_URL}/products/?slug=${slug}`);
  const found = await product_res.json();

  return {
    props: {
      product: found[0], //Using [0] becuase API response for filters is an array
    },
  };
}

export async function getStaticPaths() {
  //Retrieve all the possible paths
  const product_res = await fetch(`${API_URL}/products/`);
  const products = await product_res.json();
  //Return them to Nextjs context

  return {
    paths: products.map((product) => ({
      params: {
        slug: String(product.slug),
      },
    })),
    fallback: false, //Tells nextjs to show 404 page if param is not matched
  };
}
