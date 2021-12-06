import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { deletePost } from '../../../../actions/post';
import { SvgGarbage } from '../../../layout/icons';
import { Player } from '@lottiefiles/react-lottie-player';
import DeleteMessage from './deleteMessage/deleteMessage.component';
import ReactModal from 'react-modal';
import { toastr } from 'react-redux-toastr';
import { useTranslation } from 'react-i18next';
import trashAnimation from '../../../../assets/lottiefilesSources/trash.json';
import PropTypes from 'prop-types';

const DeleteButton = ({ postId, lg = false, deletePost }) => {
  const [showModal, setShowModal] = useState(false);

  const [t] = useTranslation();

  const onDeleteConfirm = async () => {
    setShowModal(false);
    try {
      const result = await deletePost(postId);
      if (result) {
        toastr.light(
          t('postList.buttons.delete.toastrTitle'),
          t('postList.buttons.delete.toastrText'),
          {
            status: 'info',
            icon: (
              <Player
                autoplay
                loop={false}
                src={trashAnimation}
                style={{ height: '70px', width: '70px' }}
              />
            ),
          },
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Fragment>
      <button
        className={`post-btn${lg ? '-lg' : ''} shadow-border`}
        onClick={() => setShowModal(true)}
      >
        <SvgGarbage />
        {lg && <span className="ml-05">{t('post.buttons.delete')}</span>}
      </button>
      <ReactModal
        isOpen={showModal}
        onRequestClose={() => setShowModal(false)}
        className="modal"
        overlayClassName="modal-overlay"
      >
        <DeleteMessage
          onOk={onDeleteConfirm}
          onCancel={() => setShowModal(false)}
        />
      </ReactModal>
    </Fragment>
  );
};

DeleteButton.propTypes = {
  postId: PropTypes.number.isRequired,
  lg: PropTypes.bool,
};

export default connect(null, { deletePost })(DeleteButton);
