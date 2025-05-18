import { Linking, Alert } from 'react-native';

export const openWhatsApp = async (phone: string,message: string) => {
  const number = phone.replace(/\D/g, '');
  const url = `whatsapp://send?text=${message}&phone=${number}`;
  try {
    const supported = await Linking.openURL(url);
    if (supported) {
      await Linking.openURL(url);
    } else {
      const webUrl = `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
      const webSupported = await Linking.canOpenURL(webUrl);
      if (webSupported) {
        await Linking.openURL(webUrl);
      } else {
        Alert.alert("WhatsApp not installed");
      }
    }
  } catch (error) {
    console.log("Error opening WhatsApp", error);
    Alert.alert("Error", "Could not open WhatsApp.");
  }
};
