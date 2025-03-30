import { Share } from 'react-native';

interface ShareOptions {
  message: string;
  title: string;
  url?: string;
}

const useShare = () => {
  const handleShare = async (options: ShareOptions) => {
    try {
      const result = await Share.share(options);
      
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          console.log('Shared with activity type:', result.activityType);
          return { success: true, activityType: result.activityType };
        } else {
          console.log('Shared successfully');
          return { success: true };
        }
      } else if (result.action === Share.dismissedAction) {
        console.log('Share dismissed');
        return { success: false, dismissed: true };
      }
    } catch (error) {
      console.error('Error sharing:', error);
      return { success: false, error };
    }
  };

  return { handleShare };
};

export default useShare;