import { GetStaticProps } from 'next';
import Prismic from '@prismicio/client';
import Head from 'next/head';
import { getPrismicClient } from '../../services/prismic';
import { RichText } from 'prismic-dom';
import styles from './styles.module.scss';

type Post = {
    slug: string;
}

interface PostProps {
    posts: Post;
}

export default function Posts({ posts }: PostProps) {
    return (
        <>
            <Head>
                <title>Posts | ignews</title>
            </Head>

            <main className={styles.container}>
                <div className={styles.posts}>
                    <a href="#">
                        <time>15 de agosto de 2021</time>
                        <strong>How to create a React Tree</strong>
                        <p>In this tutorial, I want to show you how to use React Table Library for creating a Tree Table or Tree List. In the previous example, you have already installed React Table Library to create a table component. </p>
                    </a>
                    <a href="#">
                        <time>15 de agosto de 2021</time>
                        <strong>How to create a React Tree</strong>
                        <p>In this tutorial, I want to show you how to use React Table Library for creating a Tree Table or Tree List. In the previous example, you have already installed React Table Library to create a table component. </p>
                    </a>
                    <a href="#">
                        <time>15 de agosto de 2021</time>
                        <strong>How to create a React Tree</strong>
                        <p>In this tutorial, I want to show you how to use React Table Library for creating a Tree Table or Tree List. In the previous example, you have already installed React Table Library to create a table component. </p>
                    </a>
                </div>
            </main>
        </>
    );
}

export const getStaticProps: GetStaticProps = async () => {
    const prismic = getPrismicClient();

    const response = await prismic.query([
        Prismic.predicates.at('document.type', 'posts'),
    ], {
        fetch: ['posts.title', 'posts.content'],
        pageSize: 100,
    });

    const posts = response.results.map(post => {
        return {
            slug: post.uid,
            title: RichText.asText(post.data.title),
            excerpt: post.data.content.find(content => content.type === 'paragraph')?.text ?? '',
            updatedAt: new Date(post.last_publication_date).toLocaleDateString('pt-BR', {
                day: '2-digit',
                month: 'long',
                year: 'numeric'
            })
        }
    });

    return {
        props: {
            posts
        }
    }
}