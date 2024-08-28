import React, { useState, useRef } from 'react';
import PostIcons from '../PostIcons';
import Image from 'next/image';
import PostMediaModal from '../PostMediaModal';
import styles from './PostCreation.module.scss';
import EmojiPicker from 'emoji-picker-react';
import avatar from '../../../public/assets/icons/woman.png';
import emoji from '../../../public/assets/icons/emoji.png';

const PostCreation = ({ dataPost, setDataPost, posts, setPosts }) => {
    const [expanded, setExpanded] = useState(false);
    const [selectedMedia, setSelectedMedia] = useState([]);
    const [mediaType, setMediaType] = useState(null);
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const textareaRef = useRef(null);
    const [srcs, setSrcs] = useState([]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setDataPost({
            ...dataPost,
            [name]: value
        })
    }

    const handleExpand = () => {
        setExpanded(true);
    };

    const handleMediaSelect = (files, type) => {
        setSelectedMedia(Array.from(files));
        setMediaType(type);
    };

    const handleEmojiClick = (emojiObject) => {
        const textarea = textareaRef.current;
        const cursorPos = textarea.selectionStart;
        const textBefore = textarea.value.substring(0, cursorPos);
        const textAfter = textarea.value.substring(cursorPos);
        const newText = `${textBefore}${emojiObject.emoji}${textAfter}`;

        setDataPost({
            ...dataPost,
            description: newText,
        });

        textarea.selectionStart = textarea.selectionEnd = cursorPos + emojiObject.emoji.length;
        setShowEmojiPicker(false);
    };


    const handleCloseModal = () => {
        setSelectedMedia([]);
        setMediaType(null);

        setSrcs([])
    };

    return (
        <div className={expanded ? styles.expandedContainer : styles.container}>
            <div className={styles.textAreaContainer}>
                <Image src={avatar} alt="Avatar" width={40} height={40} className={styles.avatarIcon} />
                <textarea
                    ref={textareaRef}
                    name='description'
                    value={dataPost.description}
                    className={styles.textArea}
                    placeholder="What are you thinking?"
                    onClick={handleExpand}
                    onChange={handleChange}
                />

                {expanded && (
                    <>
                        <div
                            className={styles.emojiIcon}
                            onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                        >
                            <img src={emoji} alt="emoji" width={22} height={22} className={styles.emoji} />
                        </div>

                        {showEmojiPicker && (
                            <div className={styles.emojiPicker}>
                                <EmojiPicker onEmojiClick={handleEmojiClick} />
                            </div>
                        )}
                    </>
                )}
            </div>

            {expanded && (
                <>
                    <div className={styles.containericons}>
                        <PostIcons onMediaSelect={handleMediaSelect} onClose={handleCloseModal} handleChangeInputs={handleChange} dataPost={dataPost} srcs={srcs} setDataPost={setDataPost} posts={posts} setPosts={setPosts} />
                        {selectedMedia.length > 0 && (
                            <PostMediaModal files={selectedMedia} onClose={handleCloseModal} dataPost={dataPost} srcs={srcs} setSrcs={setSrcs} posts={posts} setPosts={setPosts} setDataPost={setDataPost} handleChange={handleChange} />
                        )}
                    </div>

                </>
            )}
        </div>
    );
};

export default PostCreation;
