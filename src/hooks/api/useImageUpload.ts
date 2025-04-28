import { useMutation } from '@tanstack/react-query';
import requestor from '@/lib/axios';

/** Presigned URL 생성 */
function usePresignedUrl() {
  return useMutation<{ item: { url: string } }, Error, { name: string }>({
    mutationFn: async ({ name }) => {
      const token = localStorage.getItem('token');
      const res = await requestor.post<{ item: { url: string } }>('/images', { name }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return res.data; 
    },
  });
}

/** 파일 S3 업로드 (PUT) */
const uploadImageToS3 = async (presignedUrl: string, file: File) => {
  await fetch(presignedUrl, {
    method: 'PUT',
    body: file,
  });
};

/** 파일을 받아 Presigned URL 생성 + 업로드하고 URL을 반환 */
export function useUploadImage() {
  const { mutateAsync: getPresignedUrl } = usePresignedUrl();

  const upload = async (file: File) => {   
    try {
      const data = await getPresignedUrl({ name: file.name });
      const presignedUrl = data.item.url;
      await uploadImageToS3(presignedUrl, file);

      const cleanUrl = presignedUrl.split('?')[0];
      return cleanUrl;
    } catch (error: any) {
      console.error('이미지 업로드 실패:', error.message);
      throw error;
    }
  };
  return { upload };
}
