import Head from 'next/head';
import Link from 'next/link';
import Layout from '../../components/Layout';
import { useState } from 'react';
import { listBlogsWithCategoriesAndTags } from '../../actions/blog';
import Card from '../../components/blog/Card';

const Blogs = ({ blogs, categories, tags, totalBlogs,blogsLimit,blogsSkip }) => {
    
    const [limit,setLimit]=useState(blogsLimit);
    const [skip,setSkip]=useState(blogsSkip);
    const [size,setSize]=useState(totalBlogs);
    const [loadedBlogs,setLoadedBlogs]=useState([]);

    const loadMore=()=>{
        let toSkip=skip+limit;
        listBlogsWithCategoriesAndTags(limit,toSkip).then(data=>{
            if(data.error){
                console.log(data.error);
            }
            else{
                setLoadedBlogs([...loadedBlogs,...data.blogs]);
                setSize(data.size);
                setSkip(toSkip);
            }
        })
    }
    
    const loadMoreButton = () => {
        return (
            size > 0 &&
            size >= limit && (
                <button onClick={loadMore} className="btn btn-outline-primary btn-lg">
                    Load mmore
                </button>
            )
        );
    };
    
    const showAllBlogs = () => {
        return blogs.map((blog, i) => {
            // ()
            return (
                <article key={i}>
                    <Card blog={blog} />
                    <hr />
                </article>
            );
        });
    };

    const showAllCategories = () => {
        return categories.map((c, i) => (
            <Link href={`/categories/${c.slug}`} key={i}>
                <a className="btn btn-primary mr-1 ml-1 mt-3">{c.name}</a>
            </Link>
        ));
    };

    const showAllTags = () => {
        return tags.map((t, i) => (
            <Link href={`/tags/${t.slug}`} key={i}>
                <a className="btn btn-outline-primary mr-1 ml-1 mt-3">{t.name}</a>
            </Link>
        ));
    };
    const showLoadedBlogs = () => {
        return loadedBlogs.map((blog, i) => (
            <article key={i}>
                <Card blog={blog} />
            </article>
        ));
    };

    return (
        <Layout>
            <main>
                <div className="container-fluid">
                    <header>
                        <div className="col-md-12 pt-3">
                            <h1 className="display-4 font-weight-bold text-center">Programming blogs and tutorials</h1>
                        </div>
                        <section>
                            <div className="pb-5 text-center">
                                {showAllCategories()}
                                <br />
                                {showAllTags()}
                            </div>
                        </section>
                    </header>
                </div>
                <div className="container-fluid">{showAllBlogs()}</div>
                <div className="container-fluid">{showLoadedBlogs()}</div>
                <div className="text-center pt-5 pb-5">{loadMoreButton()}</div>
            </main>
        </Layout>
    );
};

Blogs.getInitialProps = () => {
    let limit=5;
    let skip=0;
    return listBlogsWithCategoriesAndTags(limit,skip).then(data => {
        if (data.error) {
            console.log(data.error);
        } else {
            return {
                blogs: data.blogs,
                categories: data.categories,
                tags: data.tags,
                totalBlogs: data.size,
                blogsLimit: limit,
                blogsSkip:skip,
            };
        }
    });
};

export default Blogs;


