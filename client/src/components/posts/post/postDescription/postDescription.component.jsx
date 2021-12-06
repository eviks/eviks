import React, { Fragment } from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';

const PostDescription = ({ description }) => {
  const [t] = useTranslation();
  return (
    <Fragment>
      <div className="my-1">
        <h2>{t('post.desc.title')}</h2>
        <p>{description}</p>
      </div>
      <div className="divider" />
    </Fragment>
  );
};

PostDescription.propTypes = {
  description: PropTypes.string.isRequired,
};

export default PostDescription;
