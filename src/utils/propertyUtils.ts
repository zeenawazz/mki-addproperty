export function generateId(): string {
  return Math.random().toString(36).substr(2, 9);
}

export function extractDataFromOCR(text: string): Record<string, string> {
  const data: Record<string, string> = {};
  const normalizedText = text.toLowerCase();
  
  // Extract address (assumes format: number + street name)
  const addressMatch = text.match(/\d+\s+[A-Za-z\s]+(?:Street|St|Avenue|Ave|Road|Rd|Boulevard|Blvd|Lane|Ln|Drive|Dr|Court|Ct|Circle|Cir|Way|Place|Pl|Square|Sq)\b/i);
  if (addressMatch) {
    data.address = addressMatch[0].trim();
  }

  // Extract price (assumes various formats)
  const priceMatch = text.match(/(?:price|rent|amount|cost):?\s*\$?\s*[\d,]+(?:\.\d{2})?/i) ||
                    text.match(/\$\s*[\d,]+(?:\.\d{2})?/);
  if (priceMatch) {
    data.price = priceMatch[0].replace(/[^0-9.]/g, '');
  }

  // Extract property type
  const propertyTypes = ['apartment', 'house', 'condo', 'townhouse', 'duplex', 'studio'];
  for (const type of propertyTypes) {
    if (normalizedText.includes(type)) {
      data.propertyType = type.charAt(0).toUpperCase() + type.slice(1);
      break;
    }
  }

  // Extract bedrooms
  const bedroomMatch = text.match(/(\d+)\s*(?:bedroom|bed|br)/i);
  if (bedroomMatch) {
    data.bedrooms = bedroomMatch[1];
  }

  // Extract bathrooms
  const bathroomMatch = text.match(/(\d+(?:\.\d+)?)\s*(?:bathroom|bath|ba)/i);
  if (bathroomMatch) {
    data.bathrooms = bathroomMatch[1];
  }

  // Extract square footage
  const sqftMatch = text.match(/(\d+)\s*(?:square feet|sq\.?\s*ft\.?|sqft)/i);
  if (sqftMatch) {
    data.squareFootage = sqftMatch[1];
  }

  // Extract year built
  const yearMatch = text.match(/(?:built|constructed|year):?\s*(\d{4})/i);
  if (yearMatch) {
    data.yearBuilt = yearMatch[1];
  }

  // Extract city and state (assumes format: City, ST)
  const cityStateMatch = text.match(/([A-Za-z\s]+),\s*([A-Z]{2})/);
  if (cityStateMatch) {
    data.city = cityStateMatch[1].trim();
    data.state = cityStateMatch[2];
  }

  // Extract ZIP code
  const zipMatch = text.match(/\b\d{5}(?:-\d{4})?\b/);
  if (zipMatch) {
    data.zipCode = zipMatch[0];
  }

  // Extract dates (assumes format: MM/DD/YYYY or MM-DD-YYYY)
  const dateMatches = text.match(/\d{2}[-/]\d{2}[-/]\d{4}/g);
  if (dateMatches?.length >= 2) {
    [data.contractStartDate, data.contractEndDate] = dateMatches;
  }

  // Extract tenant name (assumes various formats)
  const tenantMatch = text.match(/(?:tenant|lessee|resident):?\s+([A-Za-z\s]+)(?:\n|,|\.)/i);
  if (tenantMatch) {
    data.tenantName = tenantMatch[1].trim();
  }

  return data;
}