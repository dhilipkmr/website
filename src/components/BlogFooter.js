import React from 'react';
import {Link} from 'gatsby';

export default function BlogFooter(props) {
  const {posts} = props;
  console.log(props);
  return (
    <div className="blogFooter">
      <div className="mw960">
        {
          posts.map((post) => {
            const {title, date, description, timeToRead, path} = post.node.frontmatter;
            return(
              <div className="cardWrap">
              <Link to={path} className="cardHeader ellipsis2 fb">{title}</Link>
              <div className="cardHeadingSub ico12">{date + ' ~ ' + timeToRead + ' min read'}</div>
              <div className="cardDescription ico14 padT10 ellipsis2 padB10">{description}</div>
            </div>
            )
          })
        }
      </div>
    </div>
  );
}
