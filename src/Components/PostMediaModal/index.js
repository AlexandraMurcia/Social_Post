import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import FloatingMediaPreview from '../FloatingMediaPreview';
import PostIcons from '../PostIcons';
import styles from './PostMediaModal.module.scss';
import EmojiPicker from 'emoji-picker-react';
import avatar from '../../../public/assets/icons/woman.png';
import emoji from '../../../public/assets/icons/emoji.png';

const PostMediaModal = ({ files, onClose, dataPost, setDataPost, posts, setPosts ,handleChange, srcs, setSrcs }) => {
    const [selectedMedia, setSelectedMedia] = useState(files);
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const textareaRef = useRef(null);


    useEffect(() => {
        if (selectedMedia.length === 0) {
            onClose();
        }
    }, [selectedMedia, onClose]);

    const handleMediaSelect = (newFiles) => {
        if (selectedMedia.length + newFiles.length <= 5) {
            setSelectedMedia(prevFiles => [...prevFiles, ...newFiles]);
        } else {
            alert('You can select up to 5 files only.');
        }
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
        setShowEmojiPicker(false);
    };

    return (
        <div className={styles.modalBackground}>
            <div className={styles.modalContent}>
                <button className={styles.closeButton} onClick={onClose}>✖</button>
                <div className={styles.container}>
                    <div>
                        <Image src={avatar} alt="Avatar" width={40} height={40} className={styles.avatarIcon} />
                    </div>
                    <div className={styles.contt}>
                        <div className={styles.mediaContainer}>
                            <FloatingMediaPreview
                                srcs={srcs}
                                setSrcs={setSrcs}
                                files={selectedMedia}
                                onFileChange={setSelectedMedia} 
                            />
                        </div>
                    </div>
                </div>

                <div className={styles.textAreaContainer}>
                    <textarea
                        name='description'
                        value={dataPost.description}
                        ref={textareaRef}
                        className={styles.textArea}
                        placeholder="What are you thinking?"
                        onChange={handleChange}
                    />

                    <div
                        className={styles.emojiIcon}
                        onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                    >
                        <Image src={emoji} alt="emoji" width={22} height={22} className={styles.emoji} />
                    </div>

                    {showEmojiPicker && (
                        <div className={styles.emojiPicker}>
                            <EmojiPicker onEmojiClick={handleEmojiClick} />
                        </div>
                    )}
                </div>

                <PostIcons onMediaSelect={handleMediaSelect} onClose={onClose} dataPost={dataPost} srcs={srcs} setDataPost={setDataPost} posts={posts} setPosts={setPosts}/>
            </div>
        </div>
    );
};

export default PostMediaModal;
