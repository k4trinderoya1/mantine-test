import { useEffect, useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import styles from '../components/Menu/Menu.module.css';

export function MenuPage(props: any) {
  const location = useLocation();
  const [transitionStage, setTransitionStage] = useState('hidden');
  const [loading, setLoading] = useState(true);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]); 
  const openRef = useRef<HTMLInputElement | null>(null);
  const dropzoneRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setLoading(true);
    setTransitionStage('hidden');

    const timeout = setTimeout(() => {
      setLoading(false);
      setTransitionStage('fadeIn');
    }, 1000);

    return () => clearTimeout(timeout);
  }, [location.pathname]);

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const files = Array.from(event.dataTransfer.files); 
    setSelectedFiles((prevFiles) => [...prevFiles, ...files]); 

    if (dropzoneRef.current) {
      dropzoneRef.current.classList.remove(styles.dragOver);
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    if (dropzoneRef.current) {
      dropzoneRef.current.classList.add(styles.dragOver);
    }
  };

  const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    if (dropzoneRef.current) {
      dropzoneRef.current.classList.remove(styles.dragOver);
    }
  };

  const handleClick = () => {
    if (openRef.current) {
      openRef.current.click();
    }
  };

  const handleDelete = () => {
    setSelectedFiles([]); 
  };

  const handleFilesSelected = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files ? Array.from(event.target.files) : [];
    setSelectedFiles((prevFiles) => [...prevFiles, ...files]); 
  };
  const handleRemoveFile = (index: number) => {
    setSelectedFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  const renderPreviews = () => {
    return selectedFiles.map((file, index) => (
      <div
        key={index}
        className={styles.imagePreviewWrapper}
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={URL.createObjectURL(file)}
          alt={file.name}
          className={styles.imagePreview}
        />
        <div className={styles.hoverEffect}>
          <p>{file.name}</p>

        </div>
        {}
        <button
          className={styles.removeButton}
          onClick={() => handleRemoveFile(index)}
        >
          &times;
        </button>
      </div>
      
    ));
  };

  return (
    <div className={styles.pageBackground}>
      <div
        className={`${styles.pageTransition} ${styles[transitionStage]}`}
        onAnimationEnd={() => {
          if (transitionStage === 'fadeOut') {
            setTransitionStage('fadeIn');
          }
        }}
      >
        {!loading && (
          <>
            <div
              className={`${styles.dropzone} ${selectedFiles.length > 0 ? styles.dropzoneWithPreview : ''}`}
              ref={dropzoneRef}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onClick={handleClick}
            >
              <input
                type="file"
                ref={openRef}
                style={{ display: 'none' }}
                multiple 
                accept="image/*"
                onChange={handleFilesSelected}
              />
              {selectedFiles.length === 0 ? (
                <div>
                  <div className={styles.dropzoneIcon}>
                    <div className="iconUpload" />
                  </div>
                  <div>
                    <p className="text-xl">Drag images here or click to select files</p>
                    <p className="text-sm text-dimmed">
                      Files should not exceed 5mb each
                    </p>
                  </div>
                </div>
              ) : (
                <div className={styles.previewsContainer}>
                  {renderPreviews()}
                </div>
              )}
            </div>

            <div className={styles.buttonContainer}>
              <button onClick={handleClick}className={styles.selectButton}>Select more files</button>
              <button onClick={handleDelete} className={styles.deleteButton}>Delete all files</button>
            </div>

          </>
        )}
      </div>
    </div>
  );
}
