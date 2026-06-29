import { ref, computed } from 'vue';
import SITE from '@/data/site.json';
import NewzenConnector from 'newzen-connector';
import setting from '@/data/setting.json';
import { TYPE_SERVICE } from '~/constant';

export function useService() {
  const dataSite: any = ref(SITE);
  const settingData: any = ref(setting);
  const firstKey = Object.keys(SITE)[0];
  const lengthType = dataSite.value[firstKey].business_type.split('/').length;
  const businessType = dataSite.value[firstKey].business_type.split('/')[lengthType - 1];
  
  const businessTypeURL = computed(() => dataSite.value[firstKey].business_type);
  const businessName = computed(() => settingData.value?.[firstKey]?.business_name);
  const baseURL = computed(() => dataSite.value[firstKey].BaseURL);

  const siteConfig = dataSite.value[firstKey];
  const stylePrice = ref(siteConfig.customTax.style);

  // Type Price Cash Only if style Label and type both (Both just work in style Tab)
  const getTypePrice = () => {
    const type = siteConfig.customTax.type;
    return stylePrice.value === 'Label' && type === 'Both'
      ? 'Price Cash Only'
      : type;
  };
  const typePrice = ref(getTypePrice());

  // Remove TYPE_ALL if style Label
  const typeService = computed(() => {
    return stylePrice.value === 'Label'
      ? TYPE_SERVICE.filter((item) => item.id !== 'TYPE_ALL')
      : TYPE_SERVICE;
  });

  // Percent tax
  const taxPercent = computed(() => {
    const tax = siteConfig.customTax.tax;
    return typeof tax === 'number' ? tax : Number(tax);
  });

  // Handle Switch Tab
  const handleSwitch = (className: string, type: string, event: MouseEvent) => {
    const tab = document.querySelectorAll(`.${className}`);

    tab.forEach((e) => {
      if (!e.classList.contains('active') && e instanceof HTMLElement) {
        // Avoid triggering unnecessary clicks
        if (!event.isTrusted) return;
        e.click();
      }
    });
    typePrice.value = type;
  };

  // Calculate and format price
  const getPrice = (price: string) => {
    const calculatedPrice = NewzenConnector.calPriceService(
      price?.toString(),
      taxPercent.value,
      typePrice.value
    );
    
    if (stylePrice.value === 'Tab') {
      return calculatedPrice;
    } else if (stylePrice.value === 'Label') {
      const priceLabel =
        typePrice.value === 'Price Cash Only' ? 'Cash Price: ' : 'Card Price: ';
      return calculatedPrice ? `${priceLabel}${calculatedPrice}` : '';
    } else {
      return calculatedPrice;
    }
  };

  // Update type price based on current style and config
  const updateTypePrice = () => {
    typePrice.value = getTypePrice();
  };

  // Set style price and update related values
  const setStylePrice = (style: string) => {
    stylePrice.value = style;
    updateTypePrice();
  };

  return {
    // Reactive data
    businessType,
    typePrice,
    businessTypeURL,
    businessName,
    baseURL,
    // Computed properties
    typeService,
    // Methods
    getTypePrice,
    handleSwitch,
    getPrice,
    updateTypePrice,
    setStylePrice
  };
}