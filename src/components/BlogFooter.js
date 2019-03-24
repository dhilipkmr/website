import React from 'react';
import {Link} from 'gatsby';

export default function BlogFooter(props) {
  const {posts} = props;
  return (
    <div className="blogFooter">
      <div className="mw960">
        {
          posts.map((post) => {
            const {title, date, description, timeToRead, path} = post.node.frontmatter;
            return(
              <Link to={path} className="noLinkEffect">
                <div className="cardWrap" key={path}>
                  <div className="cardHeader ellipsis2 fb">{title}</div>
                  <div className="cardHeadingSub ico12 descriptionTxtColor">{date + ' ~ ' + timeToRead + ' min read'}</div>
                  <div className="cardDescription ico14 padT10 ellipsis2 padB10 descriptionTxtColor">{description}</div>
                </div>
              </Link>
            )
          })
        }
      </div>
    </div>
  );
}
