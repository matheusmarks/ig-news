import { GetServerSideProps } from 'next';
import { stripe } from '../services/stripe';
import Head from 'next/head';
import styles from './home.module.scss';
import { SubscribeButton } from '../components/SubscribeButton';

interface HomeProps {
  product: {
    priceId: string;
    amount: number;
  };
}

export default function Home({ product }: HomeProps) {
  return (
    <>
      <Head>
        <title>Home | ig.news</title>
      </Head>

      <main className={styles.contentContainer}>
        <section className={styles.hero}>
          <span>👏 Hey, welcome</span>
          <h1>How about the <span>React</span> world.</h1>
          <p>
            Get access to all the publications <br />
            <span>for  {product.amount} month</span>
          </p>

          <SubscribeButton />
        </section>
        <img src="/images/avatar.svg" alt="Girl coding" />
      </main>
    </>
  );
}

const getServerSideProps: GetServerSideProps = async () => {
  const price = await stripe.prices.retrieve('price_1J8CuUGCWDRe55YuNbG4Lpqr', {
    expand: ['product']
  });

  const product = {
    priceId: price.id,
    amount: new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price.unit_amount / 100),
  }


  return {
    props: {
      product,
    }
  }
}
