import { Alert, Linking } from 'react-native';

export const openWhatsApp = async (phoneNumber: string) => {
  const whatsappUrl = `whatsapp://send?phone=${phoneNumber}`;
  try {
    const supported = await Linking.canOpenURL(whatsappUrl);
    if (supported) {
      await Linking.openURL(whatsappUrl);
    } else {
      Alert.alert(
        "WhatsApp Not Installed",
        "WhatsApp is not installed on your device"
      );
    }
  } catch (error) {
    console.error("Error opening WhatsApp:", error);
  }
};