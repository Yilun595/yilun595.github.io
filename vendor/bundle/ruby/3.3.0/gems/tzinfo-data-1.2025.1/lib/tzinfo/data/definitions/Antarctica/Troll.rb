# encoding: UTF-8

# This file contains data derived from the IANA Time Zone Database
# (https://www.iana.org/time-zones).

module TZInfo
  module Data
    module Definitions
      module Antarctica
        module Troll
          include TimezoneDefinition
          
          timezone 'Antarctica/Troll' do |tz|
            tz.offset :o0, 0, 0, :'-00'
            tz.offset :o1, 0, 0, :'+00'
            tz.offset :o2, 0, 7200, :'+02'
            
            tz.transition 2005, 2, :o1, 1108166400
            tz.transition 2005, 3, :o2, 1111885200
            tz.transition 2005, 10, :o1, 1130634000
            tz.transition 2006, 3, :o2, 1143334800
            tz.transition 2006, 10, :o1, 1162083600
            tz.transition 2007, 3, :o2, 1174784400
            tz.transition 2007, 10, :o1, 1193533200
            tz.transition 2008, 3, :o2, 1206838800
            tz.transition 2008, 10, :o1, 1224982800
            tz.transition 2009, 3, :o2, 1238288400
            tz.transition 2009, 10, :o1, 1256432400
            tz.transition 2010, 3, :o2, 1269738000
            tz.transition 2010, 10, :o1, 1288486800
            tz.transition 2011, 3, :o2, 1301187600
            tz.transition 2011, 10, :o1, 1319936400
            tz.transition 2012, 3, :o2, 1332637200
            tz.transition 2012, 10, :o1, 1351386000
            tz.transition 2013, 3, :o2, 1364691600
            tz.transition 2013, 10, :o1, 1382835600
            tz.transition 2014, 3, :o2, 1396141200
            tz.transition 2014, 10, :o1, 1414285200
            tz.transition 2015, 3, :o2, 1427590800
            tz.transition 2015, 10, :o1, 1445734800
            tz.transition 2016, 3, :o2, 1459040400
            tz.transition 2016, 10, :o1, 1477789200
            tz.transition 2017, 3, :o2, 1490490000
            tz.transition 2017, 10, :o1, 1509238800
            tz.transition 2018, 3, :o2, 1521939600
            tz.transition 2018, 10, :o1, 1540688400
            tz.transition 2019, 3, :o2, 1553994000
            tz.transition 2019, 10, :o1, 1572138000
            tz.transition 2020, 3, :o2, 1585443600
            tz.transition 2020, 10, :o1, 1603587600
            tz.transition 2021, 3, :o2, 1616893200
            tz.transition 2021, 10, :o1, 1635642000
            tz.transition 2022, 3, :o2, 1648342800
            tz.transition 2022, 10, :o1, 1667091600
            tz.transition 2023, 3, :o2, 1679792400
            tz.transition 2023, 10, :o1, 1698541200
            tz.transition 2024, 3, :o2, 1711846800
            tz.transition 2024, 10, :o1, 1729990800
            tz.transition 2025, 3, :o2, 1743296400
            tz.transition 2025, 10, :o1, 1761440400
            tz.transition 2026, 3, :o2, 1774746000
            tz.transition 2026, 10, :o1, 1792890000
            tz.transition 2027, 3, :o2, 1806195600
            tz.transition 2027, 10, :o1, 1824944400
            tz.transition 2028, 3, :o2, 1837645200
            tz.transition 2028, 10, :o1, 1856394000
            tz.transition 2029, 3, :o2, 1869094800
            tz.transition 2029, 10, :o1, 1887843600
            tz.transition 2030, 3, :o2, 1901149200
            tz.transition 2030, 10, :o1, 1919293200
            tz.transition 2031, 3, :o2, 1932598800
            tz.transition 2031, 10, :o1, 1950742800
            tz.transition 2032, 3, :o2, 1964048400
            tz.transition 2032, 10, :o1, 1982797200
            tz.transition 2033, 3, :o2, 1995498000
            tz.transition 2033, 10, :o1, 2014246800
            tz.transition 2034, 3, :o2, 2026947600
            tz.transition 2034, 10, :o1, 2045696400
            tz.transition 2035, 3, :o2, 2058397200
            tz.transition 2035, 10, :o1, 2077146000
            tz.transition 2036, 3, :o2, 2090451600
            tz.transition 2036, 10, :o1, 2108595600
            tz.transition 2037, 3, :o2, 2121901200
            tz.transition 2037, 10, :o1, 2140045200
            tz.transition 2038, 3, :o2, 2153350800, 59172253, 24
            tz.transition 2038, 10, :o1, 2172099600, 59177461, 24
            tz.transition 2039, 3, :o2, 2184800400, 59180989, 24
            tz.transition 2039, 10, :o1, 2203549200, 59186197, 24
            tz.transition 2040, 3, :o2, 2216250000, 59189725, 24
            tz.transition 2040, 10, :o1, 2234998800, 59194933, 24
            tz.transition 2041, 3, :o2, 2248304400, 59198629, 24
            tz.transition 2041, 10, :o1, 2266448400, 59203669, 24
            tz.transition 2042, 3, :o2, 2279754000, 59207365, 24
            tz.transition 2042, 10, :o1, 2297898000, 59212405, 24
            tz.transition 2043, 3, :o2, 2311203600, 59216101, 24
            tz.transition 2043, 10, :o1, 2329347600, 59221141, 24
            tz.transition 2044, 3, :o2, 2342653200, 59224837, 24
            tz.transition 2044, 10, :o1, 2361402000, 59230045, 24
            tz.transition 2045, 3, :o2, 2374102800, 59233573, 24
            tz.transition 2045, 10, :o1, 2392851600, 59238781, 24
            tz.transition 2046, 3, :o2, 2405552400, 59242309, 24
            tz.transition 2046, 10, :o1, 2424301200, 59247517, 24
            tz.transition 2047, 3, :o2, 2437606800, 59251213, 24
            tz.transition 2047, 10, :o1, 2455750800, 59256253, 24
            tz.transition 2048, 3, :o2, 2469056400, 59259949, 24
            tz.transition 2048, 10, :o1, 2487200400, 59264989, 24
            tz.transition 2049, 3, :o2, 2500506000, 59268685, 24
            tz.transition 2049, 10, :o1, 2519254800, 59273893, 24
            tz.transition 2050, 3, :o2, 2531955600, 59277421, 24
            tz.transition 2050, 10, :o1, 2550704400, 59282629, 24
            tz.transition 2051, 3, :o2, 2563405200, 59286157, 24
            tz.transition 2051, 10, :o1, 2582154000, 59291365, 24
            tz.transition 2052, 3, :o2, 2595459600, 59295061, 24
            tz.transition 2052, 10, :o1, 2613603600, 59300101, 24
            tz.transition 2053, 3, :o2, 2626909200, 59303797, 24
            tz.transition 2053, 10, :o1, 2645053200, 59308837, 24
            tz.transition 2054, 3, :o2, 2658358800, 59312533, 24
            tz.transition 2054, 10, :o1, 2676502800, 59317573, 24
            tz.transition 2055, 3, :o2, 2689808400, 59321269, 24
            tz.transition 2055, 10, :o1, 2708557200, 59326477, 24
            tz.transition 2056, 3, :o2, 2721258000, 59330005, 24
            tz.transition 2056, 10, :o1, 2740006800, 59335213, 24
            tz.transition 2057, 3, :o2, 2752707600, 59338741, 24
            tz.transition 2057, 10, :o1, 2771456400, 59343949, 24
            tz.transition 2058, 3, :o2, 2784762000, 59347645, 24
            tz.transition 2058, 10, :o1, 2802906000, 59352685, 24
            tz.transition 2059, 3, :o2, 2816211600, 59356381, 24
            tz.transition 2059, 10, :o1, 2834355600, 59361421, 24
            tz.transition 2060, 3, :o2, 2847661200, 59365117, 24
            tz.transition 2060, 10, :o1, 2866410000, 59370325, 24
            tz.transition 2061, 3, :o2, 2879110800, 59373853, 24
            tz.transition 2061, 10, :o1, 2897859600, 59379061, 24
            tz.transition 2062, 3, :o2, 2910560400, 59382589, 24
            tz.transition 2062, 10, :o1, 2929309200, 59387797, 24
            tz.transition 2063, 3, :o2, 2942010000, 59391325, 24
            tz.transition 2063, 10, :o1, 2960758800, 59396533, 24
            tz.transition 2064, 3, :o2, 2974064400, 59400229, 24
            tz.transition 2064, 10, :o1, 2992208400, 59405269, 24
            tz.transition 2065, 3, :o2, 3005514000, 59408965, 24
            tz.transition 2065, 10, :o1, 3023658000, 59414005, 24
            tz.transition 2066, 3, :o2, 3036963600, 59417701, 24
            tz.transition 2066, 10, :o1, 3055712400, 59422909, 24
            tz.transition 2067, 3, :o2, 3068413200, 59426437, 24
            tz.transition 2067, 10, :o1, 3087162000, 59431645, 24
            tz.transition 2068, 3, :o2, 3099862800, 59435173, 24
            tz.transition 2068, 10, :o1, 3118611600, 59440381, 24
            tz.transition 2069, 3, :o2, 3131917200, 59444077, 24
            tz.transition 2069, 10, :o1, 3150061200, 59449117, 24
            tz.transition 2070, 3, :o2, 3163366800, 59452813, 24
            tz.transition 2070, 10, :o1, 3181510800, 59457853, 24
            tz.transition 2071, 3, :o2, 3194816400, 59461549, 24
            tz.transition 2071, 10, :o1, 3212960400, 59466589, 24
            tz.transition 2072, 3, :o2, 3226266000, 59470285, 24
            tz.transition 2072, 10, :o1, 3245014800, 59475493, 24
            tz.transition 2073, 3, :o2, 3257715600, 59479021, 24
            tz.transition 2073, 10, :o1, 3276464400, 59484229, 24
            tz.transition 2074, 3, :o2, 3289165200, 59487757, 24
            tz.transition 2074, 10, :o1, 3307914000, 59492965, 24
            tz.transition 2075, 3, :o2, 3321219600, 59496661, 24
            tz.transition 2075, 10, :o1, 3339363600, 59501701, 24
          end
        end
      end
    end
  end
end
