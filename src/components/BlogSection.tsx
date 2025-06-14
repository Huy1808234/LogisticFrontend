import React from 'react';
import blog01 from '../assets/img/gallery/blog01.png';
import blog1 from '../assets/img/gallery/blog1.png';
import blog02 from '../assets/img/gallery/blog02.png';

const blogPosts = [
  {
    img: blog01,
    day: '27',
    month: 'SEP',
    author: 'Jessica Temphers',
    comments: 12,
    title: 'Here’s what you should know before.',
    link: '/blog-details',
  },
  {
    img: blog1,
    day: '27',
    month: 'SEP',
    author: 'Jessica Temphers',
    comments: 12,
    title: 'Here’s what you should know before.',
    link: '/blog-details',
  },
  {
    img: blog02,
    day: '27',
    month: 'SEP',
    author: 'Jessica Temphers',
    comments: 12,
    title: 'Here’s what you should know before.',
    link: '/blog-details',
  },
];

const BlogSection: React.FC = () => {
  return (
    <div className="home-blog-area section-padding30">
      <div className="container">
        {/* Section Title */}
        <div className="row">
          <div className="col-lg-12">
            <div className="section-tittle text-center mb-70">
              <span>Our Recent News</span>
              <h2>Tourist Blog</h2>
            </div>
          </div>
        </div>

        <div className="row">
          {blogPosts.map((post, index) => (
            <div className="col-lg-4 col-md-6" key={index}>
              <div className="home-blog-single mb-30">
                <div className="blog-img-cap">
                  <div className="blog-img">
                    <img src={post.img} alt={`Blog ${index + 1}`} />
                  </div>
                </div>
                <div className="blog-caption">
                  <div className="blog-date text-center">
                    <span>{post.day}</span>
                    <p>{post.month}</p>
                  </div>
                  <div className="blog-cap">
                    <ul>
                      <li><a href="#"><i className="ti-user"></i> {post.author}</a></li>
                      <li><a href="#"><i className="ti-comment-alt"></i> {post.comments}</a></li>
                    </ul>
                    <h3><a href={post.link}>{post.title}</a></h3>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogSection;
