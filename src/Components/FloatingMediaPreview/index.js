import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Cropper from 'cropperjs';
import 'cropperjs/dist/cropper.css';
import styles from './FloatingMediaPreview.module.scss';
import editing from '../../../public/assets/icons/editing.png';


const FloatingMediaPreview = ({ files, onFileChange, dataPost, setDataPost, srcs, setSrcs }) => {

    const [showModal, setShowModal] = useState(false);
    const [cropper, setCropper] = useState(null);
    const [currentCropImageIndex, setCurrentCropImageIndex] = useState(null);
    const imageRef = useRef(null);
    const fileInputRef = useRef(null);

    useEffect(() => {
        if (files && files.length > 0) {
            const mediaUrls = files.map(file => URL.createObjectURL(file));
            setSrcs(mediaUrls);
            return () => mediaUrls.forEach(url => URL.revokeObjectURL(url));
        }
    }, [files]);

    useEffect(() => {
        if (showModal && imageRef.current && currentCropImageIndex !== null) {
            const cropperInstance = new Cropper(imageRef.current, {
                aspectRatio: 1,
                viewMode: 1,
                autoCropArea: 1,
                background: false,
                responsive: true,
                zoomable: true,
            });
            setCropper(cropperInstance);
        }
        return () => {
            if (cropper) {
                cropper.destroy();
                setCropper(null);
            }
        };
    }, [showModal, currentCropImageIndex]);

    const handleTrim = (index) => {
        setCurrentCropImageIndex(index);
        setShowModal(true);
    };

    const handleSave = async () => {
        if (!cropper || currentCropImageIndex === null) return;

        const canvas = cropper.getCroppedCanvas();
        const blob = await new Promise(resolve => canvas.toBlob(resolve));
        const croppedImageUrl = URL.createObjectURL(blob);

        setSrcs(prevSrcs => prevSrcs.map((src, index) => {
            console.log('src :>> ', src);
            return index === currentCropImageIndex ? croppedImageUrl : src
        }));
        setShowModal(false);
    };

    const handleCancel = () => {
        setShowModal(false);
        setCurrentCropImageIndex(null);
    };

    const handleFileChange = (event) => {
        const newFiles = Array.from(event.target.files);
        if (newFiles.length > 0) {
            onFileChange(newFiles);
        }
    };

    const handleRemoveFile = (index) => {
        const updatedFiles = files.filter((_, i) => i !== index);
        onFileChange(updatedFiles);
        setSrcs(prevSrcs => prevSrcs.filter((_, i) => i !== index));
    };

    return (
        <div className={styles.mediaContainer}>
            <input
                type="file"
                multiple
                ref={fileInputRef}
                style={{ display: 'none' }}
                onChange={handleFileChange}
            />
            {srcs.map((src, index) => {
                const fileType = files[index]?.type || '';
                console.log('files :>> ', files);
                return (
                    <div key={index} className={styles.mediaWrapper}>
                        {fileType.startsWith('image/') ? (
                            <img
                                src={src}
                                alt={`preview-${index}`}
                                className={styles.media}
                            />
                        ) : fileType.startsWith('video/') ? (
                            <video
                                src={src}
                                className={styles.media}
                                controls
                            />
                        ) : (
                            <audio
                                src={src}
                                className={styles.media}
                                controls
                            />
                        )}
                        <button
                            className={styles.removeButton}
                            onClick={() => handleRemoveFile(index)}
                        >
                            ✖
                        </button>
                        {fileType.startsWith('image/') && (
                            <button
                                className={styles.editButton}
                                onClick={() => handleTrim(index)}
                            >
                                <Image src={editing} alt="editing" width={18} height={18} className={styles.editingIcon} />
                                <div className={styles.textEditButton}>
                                    Edit
                                </div>

                            </button>
                        )}
                    </div>
                );
            })}

            {showModal && currentCropImageIndex !== null && (
                <div className={styles.modal}>
                    <div className={styles.modalPhoto}>
                        <Image
                            ref={imageRef}
                            src={srcs[currentCropImageIndex]}
                            alt="crop"
                            className={styles.cropImage}
                        />
                    </div>
                    <div className={styles.modalControls}>
                        <button className={styles.modalSave} onClick={handleSave}>Save</button>
                        <button className={styles.modalCancel} onClick={handleCancel}>Cancel</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default FloatingMediaPreview;
