// PostViewModal.js
import React, { use, useEffect, useState } from 'react';
import Image from 'next/image';
import styles from './PostViewModal.module.scss';
import avatar from '../../../public/assets/icons/woman.png';
import publico from '../../../public/assets/icons/public.png';
import privado from '../../../public/assets/icons/private.png';
import likeIcon from '../../../public/assets/icons/likeIcon.png';
import newLikeIcon from '../../../public/assets/icons/newLikeIcon.png';
import commentIcon from '../../../public/assets/icons/commentIcon.png';
import shareIcon from '../../../public/assets/icons/shareIcon.png';

const PostViewModal = ({ posts }) => {
    const [likedPosts, setLikedPosts] = useState(Array(posts.length).fill(false));

    const handleLikeClick = (index) => {
        const updatedLikes = [...likedPosts];
        updatedLikes[index] = !updatedLikes[index];
        setLikedPosts(updatedLikes);
    };


    return (
        <div className={styles.mainContainer}>
            <div >

                {
                    posts.map((post, index) => (
                        <>
                            <div className={styles.modalContent}>
                                <div className={styles.header}>
                                    <div className={styles.avatar}>
                                        <Image src={avatar} alt="Avatar" width={40} height={40} className={styles.avatarIcon} />
                                    </div>

                                    <p className={styles.name}>{post.name}</p>
                                    <p className={styles.time}>·  1 min</p>
                                    <div className={styles.privacity}>
                                        {post.privacity === "Público" ? (
                                            <Image src={publico} alt="Icono Público" width={18} height={18} className={styles.iconPrivacity} />
                                        ) : (
                                            <Image src={privado} alt="Icono Privado" width={18} height={18} className={styles.iconPrivacity} />
                                        )}
                                    </div>

                                </div>

                                <div className={styles.files}>
                                    {post.files.map((src, index) => {
                                        const fileType = post.files[index]?.type || '';

                                        return (
                                            <div key={index} className={styles.mediaWrapper}>
                                                <img
                                                    src={src}
                                                    alt={`preview-${index}`}
                                                    className={styles.media}
                                                />
                                            </div>
                                        );
                                    })}
                                </div>


                                <div className={styles.description}>
                                    {post.description}
                                </div>



                                <div className={styles.inter}>
                                    <div
                                        onClick={() => handleLikeClick(index)}
                                        className={`${styles.likeButton} ${likedPosts[index] ? styles.liked : ''}`}
                                    >
                                        <Image
                                            src={likedPosts[index] ? newLikeIcon : likeIcon}
                                            alt="Likes"
                                            width={24}
                                            height={24}
                                        />
                                        <p>{likedPosts[index] ? '21 Likes' : '20 Likes'}</p>
                                    </div>
                                    <div>
                                        <Image src={commentIcon} alt="Comments" width={24} height={24} />
                                        <p>10k comments</p>
                                    </div>
                                    <div>
                                        <Image src={shareIcon} alt="Shares" width={24} height={24} />
                                        <p>42 shares</p>
                                    </div>
                                </div>


                            </div>

                        </>
                    ))
                }

            </div>
        </div>
    );
};

export default PostViewModal;
