import { useEffect, useState,useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { Group, Text, Button } from '@mantine/core';
import { IconUpload, IconX, IconPhoto } from '@tabler/icons-react';
import { rem } from '@mantine/core';
import styles from '../components/Menu/Menu.module.css';
import { Dropzone,DropzoneProps } from '@mantine/Dropzone';
import { IMAGE_MIME_TYPE, FileWithPath, FileRejection } from '@mantine/Dropzone';

export function MenuPage(props: Partial<DropzoneProps>) {
  const location = useLocation();
  const [transitionStage, setTransitionStage] = useState('hidden');
  const [loading, setLoading] = useState(true);
  const openRef = useRef<() => void>(null as any);

  useEffect(() => {
    setLoading(true);
    setTransitionStage('hidden');

    const timeout = setTimeout(() => {
      setLoading(false);
      setTransitionStage('fadeIn');
    }, 1000);

    return () => clearTimeout(timeout);
  }, [location.pathname]);

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
            <div className={styles.formGroup}>
              <input type="text" className={styles.input} placeholder=" " />
              <label className={styles.label}>Search</label>
            </div>

            <Dropzone
              onDrop={(files: FileWithPath[]) => console.log('accepted files', files)}
              onReject={(fileRejections: FileRejection[]) => console.log('rejected files', fileRejections)}
              maxSize={5 * 1024 ** 2}
              accept={IMAGE_MIME_TYPE}
              openRef={openRef} 
              {...props}
            >
              <Group justify="center" gap="xl" mih={220} style={{ pointerEvents: 'none' }}>
                <Dropzone.Accept>
                  <IconUpload
                    style={{ width: rem(52), height: rem(52), color: 'var(--mantine-color-blue-6)' }}
                    stroke={1.5}
                  />
                </Dropzone.Accept>
                <Dropzone.Reject>
                  <IconX
                    style={{ width: rem(52), height: rem(52), color: 'var(--mantine-color-red-6)' }}
                    stroke={1.5}
                  />
                </Dropzone.Reject>
                <Dropzone.Idle>
                  <IconPhoto
                    style={{ width: rem(52), height: rem(52), color: 'var(--mantine-color-dimmed)' }}
                    stroke={1.5}
                  />
                </Dropzone.Idle>

                <div>
                  <Text size="xl" inline>
                    Drag images here or click to select files
                  </Text>
                  <Text size="sm" c="dimmed" inline mt={7}>
                    Attach as many files as you like, each file should not exceed 5mb
                  </Text>
                </div>
              </Group>
            </Dropzone>
            <Group justify="center" mt="md">
              <Button onClick={() => openRef.current?.()}>Select files</Button>
            </Group>
          </>
        )}
      </div>
    </div>
  );
}
