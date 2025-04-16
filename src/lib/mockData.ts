import { PortfolioItem } from "./googleSheets";

export const mockPortfolioItems: PortfolioItem[] = [
  {
    id: "1",
    title: "모던한 거실 디자인",
    images: [
      {
        url: "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92",
        description: "밝은 채광의 화이트 거실 인테리어",
      },
      {
        url: "https://images.unsplash.com/photo-1598928506311-c55ded91a20c",
        description: "모던한 소파와 테이블 배치",
      },
      {
        url: "https://images.unsplash.com/photo-1556912167-f556f1f39fdf",
        description: "전체적인 거실 구성",
      },
    ],
    description:
      "밝고 모던한 분위기의 거실 인테리어입니다. 화이트와 그레이의 조화로 심플하면서도 세련된 공간을 연출했습니다.",
    category: "거실",
    date: "2023-09-15",
    order: 1,
  },
  {
    id: "2",
    title: "미니멀 주방 디자인",
    images: [
      {
        url: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f",
        description: "넓은 주방 인테리어",
      },
      {
        url: "https://images.unsplash.com/photo-1600489000022-c2086d79f9d4",
        description: "주방 아일랜드 디자인",
      },
    ],
    description:
      "모던하고 미니멀한 주방 디자인입니다. 기능성과 디자인을 모두 고려한 공간 구성이 특징입니다.",
    category: "주방",
    date: "2023-10-20",
    order: 2,
  },
  {
    id: "3",
    title: "아늑한 침실 디자인",
    images: [
      {
        url: "https://images.unsplash.com/photo-1560185127-6ed189bf02f4",
        description: "자연광이 들어오는 편안한 침실",
      },
      {
        url: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace",
        description: "부드러운 조명의 침실 분위기",
      },
    ],
    description:
      "편안한 휴식을 위한, 자연광이 풍부한 침실 인테리어입니다. 내추럴 톤의 색상으로 아늑한 분위기를 만들었습니다.",
    category: "침실",
    date: "2023-11-05",
    order: 3,
  },
  {
    id: "4",
    title: "세련된 욕실 디자인",
    images: [
      {
        url: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14",
        description: "모던한 화이트 욕실",
      },
      {
        url: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a",
        description: "자연석 타일 욕실 인테리어",
      },
    ],
    description:
      "모던한 감각의 욕실 디자인입니다. 화이트와 우드 톤의 조화로 깔끔하면서도 따뜻한 분위기를 연출했습니다.",
    category: "욕실",
    date: "2023-12-10",
    order: 4,
  },
  {
    id: "5",
    title: "모던 클래식 거실",
    images: [
      {
        url: "https://images.unsplash.com/photo-1613545325278-f24b0cae1224",
        description: "고급스러운 거실 인테리어",
      },
      {
        url: "https://images.unsplash.com/photo-1618220179428-22790b485988",
        description: "클래식한 디테일의 거실",
      },
    ],
    description:
      "클래식한 요소와 모던한 디자인이 어우러진 거실 인테리어입니다. 고급스러운 소재와 색상으로 품격있는 공간을 구성했습니다.",
    category: "거실",
    date: "2024-01-15",
    order: 5,
  },
  {
    id: "6",
    title: "스칸디나비안 침실",
    images: [
      {
        url: "https://images.unsplash.com/photo-1617104678098-de229db51175",
        description: "미니멀리즘이 돋보이는 침실 공간",
      },
      {
        url: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0",
        description: "가구 배치 및 수납 공간",
      },
      {
        url: "https://images.unsplash.com/photo-1588046130717-0eb0c9a3ba15",
        description: "전체적인 침실 분위기",
      },
    ],
    description:
      "스칸디나비안 스타일의 밝고 깔끔한 침실입니다. 미니멀한 가구 배치와 자연소재의 활용이 돋보입니다.",
    category: "침실",
    date: "2024-02-20",
    order: 6,
  },
];
