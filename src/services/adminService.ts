import { AdminKPIs, PackageMarginInfo } from '../types';

const MOCK_ADMIN_KPIS: AdminKPIs = {
  totalInquiries: 342,
  totalConfirmedBookings: 188,
  grossTravelSales: 7850000,
  supplierCost: 5620000,
  grossMargin: 2230000,
  totalActiveMembers: 142,
  totalYellowMembers: 84,
  totalCommissionsPaid: 624400,
  compToGrossMarginRatio: 0.28, // 28% of gross margin
  safetyThreshold: 0.40, // 40% maximum sustainable limit
  pendingWithdrawals: 18500
};

const MOCK_PACKAGE_MARGINS: PackageMarginInfo[] = [
  {
    id: 'pkg-goa',
    packageName: 'Goa Coastal Odyssey',
    destination: 'Goa, India',
    category: 'domestic',
    estimatedSellingPrice: 32000,
    supplierCost: 22500,
    taxesAndFees: 2500,
    minimumGrossProfit: 7000,
    maxAffiliateAllocation: 2500,
    inquiryCount: 94
  },
  {
    id: 'pkg-kashmir',
    packageName: 'Kashmir: Paradise on Earth',
    destination: 'Jammu & Kashmir, India',
    category: 'domestic',
    estimatedSellingPrice: 48000,
    supplierCost: 35000,
    taxesAndFees: 3800,
    minimumGrossProfit: 9200,
    maxAffiliateAllocation: 3500,
    inquiryCount: 112
  },
  {
    id: 'pkg-dubai',
    packageName: 'Dubai: Futuristic Marvels',
    destination: 'UAE',
    category: 'international',
    estimatedSellingPrice: 85000,
    supplierCost: 64000,
    taxesAndFees: 6200,
    minimumGrossProfit: 14800,
    maxAffiliateAllocation: 5000,
    inquiryCount: 88
  },
  {
    id: 'pkg-bali',
    packageName: 'Bali: Island of the Gods',
    destination: 'Indonesia',
    category: 'international',
    estimatedSellingPrice: 65000,
    supplierCost: 48000,
    taxesAndFees: 4800,
    minimumGrossProfit: 12200,
    maxAffiliateAllocation: 4200,
    inquiryCount: 76
  }
];

export const adminService = {
  getKPIs: async (): Promise<AdminKPIs> => {
    return { ...MOCK_ADMIN_KPIS };
  },

  getPackageMargins: async (): Promise<PackageMarginInfo[]> => {
    return [...MOCK_PACKAGE_MARGINS];
  }
};
