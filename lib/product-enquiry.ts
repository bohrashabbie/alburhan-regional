import type { Product } from './types';

export const PRODUCT_ENQUIRY_PARAM = 'product';

/** Contact page URL with product id for enquiry pre-fill */
export function productEnquiryHref(productId: number) {
  return `/contact?${PRODUCT_ENQUIRY_PARAM}=${productId}`;
}

export function getProductDisplayName(
  product: Product,
  locale: string,
): string {
  const isRTL = locale === 'ar';
  return (isRTL ? product.name_ar || product.name_en : product.name_en) || '';
}

export function buildProductEnquirySubject(
  product: Product,
  locale: string,
): string {
  const name = getProductDisplayName(product, locale);
  return locale === 'ar'
    ? `استفسار عن منتج: ${name}`
    : `Product enquiry: ${name}`;
}

export function buildProductEnquiryMessage(
  product: Product,
  locale: string,
): string {
  const name = getProductDisplayName(product, locale);
  const desc =
    locale === 'ar'
      ? product.description_ar || product.description_en
      : product.description_en || product.description_ar;
  const intro =
    locale === 'ar'
      ? `أود الاستفسار عن المنتج التالي:\n\n${name}`
      : `I would like to enquire about the following product:\n\n${name}`;
  const prompt =
    locale === 'ar'
      ? '\n\nيرجى ذكر الكمية أو المواصفات أو أي استفسارات:'
      : '\n\nPlease share quantity, specifications, or any questions:';
  if (desc) {
    return `${intro}\n\n${desc}${prompt}\n\n`;
  }
  return `${intro}${prompt}\n\n`;
}
