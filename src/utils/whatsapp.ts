import { Alert, Linking } from 'react-native';

export const openWhatsApp = async (phoneNumber: string) => {
  const formattedNumber = phoneNumber.replace(/\D/g, '');
  const whatsappUrl = `whatsapp://send?phone=${formattedNumber}`;
  
  try {
    const supported = await Linking.canOpenURL(whatsappUrl);
    if (supported) {
      await Linking.openURL(whatsappUrl);
    } else {
      const webWhatsappUrl = `https://wa.me/${formattedNumber}`;
      const webSupported = await Linking.canOpenURL(webWhatsappUrl);
      
      if (webSupported) {
        await Linking.openURL(webWhatsappUrl);
      } else {
        Alert.alert(
          "WhatsApp Not Installed",
          "WhatsApp is not installed on your device"
        );
      }
    }
  } catch (error) {
    console.error("Error opening WhatsApp:", error);
  }
};
