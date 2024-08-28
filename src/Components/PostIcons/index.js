import React, { useState, useRef } from 'react';
import styles from './PostIcons.module.scss';
import Image from 'next/image';
import pictureIcon from '../../../public/assets/icons/pictureIcon.png';
import videoIcon from '../../../public/assets/icons/videoIcon.png';
import audioIcon from '../../../public/assets/icons/audioIcon.png';
import dropdownArrow from '../../../public/assets/icons/dropdownArrow.png';

const PostIcons = ({ onMediaSelect, onClose, dataPost, setDataPost, srcs, posts, setPosts  }) => {
	const [isOpen, setIsOpen] = useState(false);

	const imageInputRef = useRef(null);
	const videoInputRef = useRef(null);
	const audioInputRef = useRef(null);

	const isPostButtonEnabled = () => {
        return dataPost.description.trim() !== '' || srcs.length > 0;
    };

	const saveInfo = () => {
		const tempPost = posts;
		tempPost.push({...dataPost, files:srcs})
		setPosts(tempPost)

		setDataPost({
			name:"Alexandra",
			description:"",
			privacity:"Público",
			files:[]
		})

		onClose();
	}

	const handleFileSelect = (type) => {
		if (type === 'image') imageInputRef.current.click();
		if (type === 'video') videoInputRef.current.click();
		if (type === 'audio') audioInputRef.current.click();
	};

	const handleChange = (e, type) => {
		const files = Array.from(e.target.files);
		if (files.length > 5) {
			alert('You can select up to 5 files only.');
			return;
		}
		if (files.length > 0) {
			onMediaSelect(files, type);
		}
	};

	const toggleDropdown = () => {
		setIsOpen(!isOpen);
	};

	const selectOption = (option) => {
		setDataPost({
			...dataPost,
			privacity: option
		})
		setIsOpen(false);
	};

	return (

		<div className={styles.container}>
			<div className={styles.iconContainer}>
				<span className={styles.addText}>Agrega</span>
				<button onClick={() => handleFileSelect('image')} className={styles.iconButton}>
					<Image src={pictureIcon} width={20} height={20} alt="Image" />
				</button>
				<button  className={styles.iconButton}>
					<Image src={videoIcon} width={20} height={20} alt="Video" />
				</button>
				<button  className={styles.iconButton}>
					<Image src={audioIcon} width={20} height={20} alt="Audio" />
				</button>

				<input
					ref={imageInputRef}
					type="file"
					accept="image/*"
					style={{ display: 'none' }}
					multiple
					onChange={(e) => handleChange(e, 'image')}
				/>
				<input
					ref={videoInputRef}
					type="file"
					accept="video/*"
					style={{ display: 'none' }}
					multiple
					onChange={(e) => handleChange(e, 'video')}
				/>
				<input
					ref={audioInputRef}
					type="file"
					accept="audio/*"
					style={{ display: 'none' }}
					multiple
					onChange={(e) => handleChange(e, 'audio')}
				/>
			</div>

			<div className={styles.opcionContainer}>
				<div className={styles.dropDownContainer}>
					<button className={styles.dropDownButton} onClick={toggleDropdown}>
						{dataPost?.privacity}
						<Image src={dropdownArrow} alt="Dropdown Arrow" width={16} height={16} className={styles.arrowIcon} />
					</button>
					{isOpen && (
						<div className={styles.dropDownMenu}>
							<button className={styles.dropDownItem} onClick={() => selectOption('Público')}>
								Público
							</button>
							<button className={styles.dropDownItem} onClick={() => selectOption('Privado')}>
								Privado
							</button>
						</div>
					)}
				</div>

				<div className={styles.buttonContainer}>
					<button className={styles.postButton} onClick={saveInfo} disabled={!isPostButtonEnabled()}>Post</button>
				</div>
			</div>
		</div>
	);
};

export default PostIcons;
