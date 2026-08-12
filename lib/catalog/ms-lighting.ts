// ===========================================================================
// MS Lighting catalogue — the manufacturing arm of the Al-Burhan group.
//
// Mirrored from mslighting.alburhan-regional.com so the parent site can show
// the full range without a second CMS round-trip. Images are served straight
// from the shared S3 bucket, so a re-shoot on the MS Lighting side shows up
// here too. Re-run scripts/sync-catalog.mjs to refresh model lists.
//
// 15 families · 109 models · synced 2026-08-12
// ===========================================================================

export type CatalogZone = 'indoor' | 'outdoor';

export interface CatalogModel {
  /** URL segment, unique within its family. */
  slug: string;
  /** Manufacturer model code, e.g. "MS-240R". */
  code: string;
  name: string;
  image: string;
  /** Specification sheet artwork, when the factory has published one. */
  spec: string | null;
}

export interface CatalogFamily {
  slug: string;
  name: string;
  zone: CatalogZone;
  /** One-word positioning label used on cards. */
  tag: string;
  blurb: string;
  image: string;
  order: number;
  products: CatalogModel[];
}

export const CATALOG: CatalogFamily[] = [
  {
    "slug": "recessed-down-light",
    "name": "Recessed Down Light",
    "zone": "indoor",
    "tag": "Recessed",
    "blurb": "The ambient workhorse. Cut into the ceiling plane so the fixture disappears and only the light remains.",
    "image": "https://alburhan-asset.s3.eu-north-1.amazonaws.com/site/renders/MS-240R.png",
    "order": 0,
    "products": [
      {
        "slug": "ms-240r",
        "code": "MS-240R",
        "name": "MS-240R Recessed Down Light",
        "image": "https://alburhan-asset.s3.eu-north-1.amazonaws.com/ms-lighting/products/30b5725771534f419eeca37217c1c80e.webp",
        "spec": "https://alburhan-asset.s3.eu-north-1.amazonaws.com/ms-lighting/products/d97df3820c7044c997c972cc8fd0ed92.webp"
      },
      {
        "slug": "ms-241",
        "code": "MS-241",
        "name": "MS-241 Recessed Down Light",
        "image": "https://alburhan-asset.s3.eu-north-1.amazonaws.com/ms-lighting/products/062022b4c89244df8f39705521a23b13.webp",
        "spec": "https://alburhan-asset.s3.eu-north-1.amazonaws.com/ms-lighting/products/ae8d14b068a24eefab669f4eca3e7fd5.webp"
      },
      {
        "slug": "ms-250",
        "code": "MS-250",
        "name": "MS-250 Recessed Down Light",
        "image": "https://alburhan-asset.s3.eu-north-1.amazonaws.com/ms-lighting/products/6687ca5818214a9fa21df8ff785fd66c.webp",
        "spec": "https://alburhan-asset.s3.eu-north-1.amazonaws.com/ms-lighting/products/ef94edc1d5f747acac3f2bea899a7d6c.webp"
      },
      {
        "slug": "ms-242",
        "code": "MS-242",
        "name": "MS-242 Recessed Down Light",
        "image": "https://alburhan-asset.s3.eu-north-1.amazonaws.com/ms-lighting/products/a68263aafd52452b90d9adc4fc76c852.webp",
        "spec": "https://alburhan-asset.s3.eu-north-1.amazonaws.com/ms-lighting/products/c62803b95e7c46bbbe272de41ec901cc.webp"
      },
      {
        "slug": "dl284a",
        "code": "DL284A",
        "name": "DL284A",
        "image": "https://alburhan-asset.s3.eu-north-1.amazonaws.com/ms-lighting/products/upshine/38b6c3b7c4124644a8af606b3f733cce.webp",
        "spec": "https://alburhan-asset.s3.eu-north-1.amazonaws.com/ms-lighting/products/upshine/9a3a6863c32f4a5cae0b85993bbb53aa.webp"
      },
      {
        "slug": "dl266b",
        "code": "DL266B",
        "name": "DL266B",
        "image": "https://alburhan-asset.s3.eu-north-1.amazonaws.com/ms-lighting/products/upshine/7f62fd9967c142f59016e1a0685edd22.webp",
        "spec": "https://alburhan-asset.s3.eu-north-1.amazonaws.com/ms-lighting/products/upshine/a57820d72b5e43b48c73287ce5406d48.webp"
      },
      {
        "slug": "dl297a",
        "code": "DL297A",
        "name": "DL297A",
        "image": "https://alburhan-asset.s3.eu-north-1.amazonaws.com/ms-lighting/products/upshine/1ac6f0013ac74ea9a1030587d3ac10f7.webp",
        "spec": "https://alburhan-asset.s3.eu-north-1.amazonaws.com/ms-lighting/products/upshine/c7f0943747e741b1b86338b4724ef00b.webp"
      },
      {
        "slug": "dl328",
        "code": "DL328",
        "name": "DL328",
        "image": "https://alburhan-asset.s3.eu-north-1.amazonaws.com/ms-lighting/products/upshine/72a92d8fca844cee83308cb5c52cda28.webp",
        "spec": "https://alburhan-asset.s3.eu-north-1.amazonaws.com/ms-lighting/products/upshine/bdc39f5e71f34deda98943325e0db0ae.webp"
      },
      {
        "slug": "dl176",
        "code": "DL176",
        "name": "DL176",
        "image": "https://alburhan-asset.s3.eu-north-1.amazonaws.com/ms-lighting/products/upshine/0cfa021fb5104811be385c3e591cb56c.webp",
        "spec": "https://alburhan-asset.s3.eu-north-1.amazonaws.com/ms-lighting/products/upshine/8886e2504799494fa2434e6976ee24b9.webp"
      },
      {
        "slug": "dl269",
        "code": "DL269",
        "name": "DL269",
        "image": "https://alburhan-asset.s3.eu-north-1.amazonaws.com/ms-lighting/products/upshine/50a035e04ba8434f9ba8ddabcfc1d025.webp",
        "spec": "https://alburhan-asset.s3.eu-north-1.amazonaws.com/ms-lighting/products/upshine/e487639db8b841a89522a610697b07d8.webp"
      }
    ]
  },
  {
    "slug": "surface-mounted-down-light",
    "name": "Surface Mounted Down Light",
    "zone": "indoor",
    "tag": "Surface",
    "blurb": "The same optic where the ceiling void is too shallow to cut — mounted proud, glare still controlled.",
    "image": "https://alburhan-asset.s3.eu-north-1.amazonaws.com/site/renders/MS-252.png",
    "order": 1,
    "products": [
      {
        "slug": "ms-252",
        "code": "MS-252",
        "name": "MS-252 Surface Mounted Down Light",
        "image": "https://alburhan-asset.s3.eu-north-1.amazonaws.com/ms-lighting/products/dda92bf97f054f01bffddf32f975d985.webp",
        "spec": "https://alburhan-asset.s3.eu-north-1.amazonaws.com/ms-lighting/products/a06f0564dd7946aeb9fef35699be3015.webp"
      },
      {
        "slug": "ms-257",
        "code": "MS-257",
        "name": "MS-257 Surface Mounted Down Light",
        "image": "https://alburhan-asset.s3.eu-north-1.amazonaws.com/ms-lighting/products/827adbd78bd547d68a6f77246843524c.webp",
        "spec": "https://alburhan-asset.s3.eu-north-1.amazonaws.com/ms-lighting/products/deffa65995a94226a57e779f7cc52c8f.webp"
      },
      {
        "slug": "dl438a",
        "code": "DL438A",
        "name": "DL438A",
        "image": "https://alburhan-asset.s3.eu-north-1.amazonaws.com/ms-lighting/products/upshine/a8121c26ae0d418fab24dc58af1a384c.webp",
        "spec": "https://alburhan-asset.s3.eu-north-1.amazonaws.com/ms-lighting/products/upshine/59ea12d5eb20416abbe0a97acc495663.webp"
      },
      {
        "slug": "dl130",
        "code": "DL130",
        "name": "DL130",
        "image": "https://alburhan-asset.s3.eu-north-1.amazonaws.com/ms-lighting/products/upshine/4cd43c83e4d34323bf9ae7b8612cf060.webp",
        "spec": "https://alburhan-asset.s3.eu-north-1.amazonaws.com/ms-lighting/products/upshine/b6d517a44c1f409896c6cabc6171038e.webp"
      },
      {
        "slug": "dl379c",
        "code": "DL379C",
        "name": "DL379C",
        "image": "https://alburhan-asset.s3.eu-north-1.amazonaws.com/ms-lighting/products/upshine/a11d0a403d3d44de8e5a2eb5414845f4.webp",
        "spec": "https://alburhan-asset.s3.eu-north-1.amazonaws.com/ms-lighting/products/upshine/d0697e863b0a4ee4b718dd24c896e05a.webp"
      },
      {
        "slug": "dl338d",
        "code": "DL338D",
        "name": "DL338D",
        "image": "https://alburhan-asset.s3.eu-north-1.amazonaws.com/ms-lighting/products/upshine/9655a88aecc84fe7977320672129fd8d.webp",
        "spec": "https://alburhan-asset.s3.eu-north-1.amazonaws.com/ms-lighting/products/upshine/58e27e2efb5147d79dbe0976ecbee578.webp"
      },
      {
        "slug": "dl386b",
        "code": "DL386B",
        "name": "DL386B",
        "image": "https://alburhan-asset.s3.eu-north-1.amazonaws.com/ms-lighting/products/upshine/fa17b2b280154a998a715a5c7b815922.webp",
        "spec": "https://alburhan-asset.s3.eu-north-1.amazonaws.com/ms-lighting/products/upshine/bd3cddb3e4614c8696270d9d08f6dfcb.webp"
      },
      {
        "slug": "dl387",
        "code": "DL387",
        "name": "DL387",
        "image": "https://alburhan-asset.s3.eu-north-1.amazonaws.com/ms-lighting/products/upshine/d843b637a48d402cb108921d07c555b7.webp",
        "spec": "https://alburhan-asset.s3.eu-north-1.amazonaws.com/ms-lighting/products/upshine/576d246d8f9f4e7cb46d11d632af8093.webp"
      }
    ]
  },
  {
    "slug": "recessed-grille-spot-light",
    "name": "Recessed Grille Spot Light",
    "zone": "indoor",
    "tag": "Recessed",
    "blurb": "Multi-head grille bodies for gallery and retail ceilings that need aim without clutter.",
    "image": "https://alburhan-asset.s3.eu-north-1.amazonaws.com/site/renders/MS-220GR.png",
    "order": 2,
    "products": [
      {
        "slug": "ms-220gr",
        "code": "MS-220GR",
        "name": "MS-220GR Recessed Grille Spot Light",
        "image": "https://alburhan-asset.s3.eu-north-1.amazonaws.com/ms-lighting/products/af44efe98ca448f39ca30daef5355f5c.webp",
        "spec": "https://alburhan-asset.s3.eu-north-1.amazonaws.com/ms-lighting/products/5c1102b0afc34d0f8ef3a7a2d4766f28.webp"
      }
    ]
  },
  {
    "slug": "recessed-panel-light",
    "name": "Recessed Panel Light",
    "zone": "indoor",
    "tag": "Recessed",
    "blurb": "Even, low-glare sheets of light for offices, clinics and corridors on modular grids.",
    "image": "https://alburhan-asset.s3.eu-north-1.amazonaws.com/site/renders/MS-1140.png",
    "order": 3,
    "products": [
      {
        "slug": "ms-1140",
        "code": "MS-1140",
        "name": "MS-1140 Recessed Panel Light",
        "image": "https://alburhan-asset.s3.eu-north-1.amazonaws.com/ms-lighting/products/f6646271eba84e34b46c011ce777a5fd.webp",
        "spec": "https://alburhan-asset.s3.eu-north-1.amazonaws.com/ms-lighting/products/37df37aa94c44737aaa81ec2b4928faa.webp"
      },
      {
        "slug": "pl-ck5",
        "code": "PL-CK5",
        "name": "PL-CK5",
        "image": "https://alburhan-asset.s3.eu-north-1.amazonaws.com/ms-lighting/products/upshine/f09b841d37d748c9a069fa8e9ac1b142.webp",
        "spec": "https://alburhan-asset.s3.eu-north-1.amazonaws.com/ms-lighting/products/upshine/98887c52a19f47a2b8c33981f9eb8afd.webp"
      },
      {
        "slug": "pl008",
        "code": "PL008",
        "name": "PL008",
        "image": "https://alburhan-asset.s3.eu-north-1.amazonaws.com/ms-lighting/products/upshine/a530856ce42940b792293190931b839f.webp",
        "spec": "https://alburhan-asset.s3.eu-north-1.amazonaws.com/ms-lighting/products/upshine/06d72b5edb494581b64267cb580a86ff.webp"
      },
      {
        "slug": "pl-db",
        "code": "PL-DB",
        "name": "PL-DB",
        "image": "https://alburhan-asset.s3.eu-north-1.amazonaws.com/ms-lighting/products/upshine/2006287f50654b8dbe9d11294e627db8.webp",
        "spec": "https://alburhan-asset.s3.eu-north-1.amazonaws.com/ms-lighting/products/upshine/19a230798e7d4981925974378808fb8c.webp"
      },
      {
        "slug": "pl-01",
        "code": "PL-01",
        "name": "PL-01",
        "image": "https://alburhan-asset.s3.eu-north-1.amazonaws.com/ms-lighting/products/upshine/829cf45f8d744fa7a7fa46c6920dd6a0.webp",
        "spec": "https://alburhan-asset.s3.eu-north-1.amazonaws.com/ms-lighting/products/upshine/5fc05d9185364045bed7e608830ff5ae.webp"
      },
      {
        "slug": "pl-dd",
        "code": "PL-DD",
        "name": "PL-DD",
        "image": "https://alburhan-asset.s3.eu-north-1.amazonaws.com/ms-lighting/products/upshine/a10feffddb9d47a4b1f4ed0c5361fd8c.webp",
        "spec": "https://alburhan-asset.s3.eu-north-1.amazonaws.com/ms-lighting/products/upshine/78235e22a5d04ea3b2d307962596cc58.webp"
      },
      {
        "slug": "pl-ck8",
        "code": "PL-CK8",
        "name": "PL-CK8",
        "image": "https://alburhan-asset.s3.eu-north-1.amazonaws.com/ms-lighting/products/upshine/da4bac449f174f3f86e8ef9b414afc39.webp",
        "spec": "https://alburhan-asset.s3.eu-north-1.amazonaws.com/ms-lighting/products/upshine/d2ae316c5fe846149702fbadb36c2a08.webp"
      }
    ]
  },
  {
    "slug": "recessed-spot-light",
    "name": "Recessed Spot Light",
    "zone": "indoor",
    "tag": "Accent",
    "blurb": "Tight beams for artwork, joinery and vertical surfaces — adjustable, deep-baffled, UGR-controlled.",
    "image": "https://alburhan-asset.s3.eu-north-1.amazonaws.com/site/renders/MS-341AR.png",
    "order": 4,
    "products": [
      {
        "slug": "ms-341ar",
        "code": "MS-341AR",
        "name": "MS-341AR Recessed Spot Light",
        "image": "https://alburhan-asset.s3.eu-north-1.amazonaws.com/ms-lighting/products/c1af6d550a384d218ce866cda75a7be8.webp",
        "spec": "https://alburhan-asset.s3.eu-north-1.amazonaws.com/ms-lighting/products/e8347cef70c04e8b8b5b7896c46e677c.webp"
      },
      {
        "slug": "ms-342br",
        "code": "MS-342BR",
        "name": "MS-342BR Recessed Spot Light",
        "image": "https://alburhan-asset.s3.eu-north-1.amazonaws.com/ms-lighting/products/b6d9aa2534a04ba4b264e5ec4cf71ea4.webp",
        "spec": "https://alburhan-asset.s3.eu-north-1.amazonaws.com/ms-lighting/products/bd53c4ac0aad42808279e9e89bf74b2c.webp"
      },
      {
        "slug": "ms-342cr",
        "code": "MS-342CR",
        "name": "MS-342CR Recessed Spot Light",
        "image": "https://alburhan-asset.s3.eu-north-1.amazonaws.com/ms-lighting/products/17397ea5da8445819e33473e5810082a.webp",
        "spec": "https://alburhan-asset.s3.eu-north-1.amazonaws.com/ms-lighting/products/ab8ea0bcf6dd4f9fb602be98acd10ac6.webp"
      },
      {
        "slug": "ms-304",
        "code": "MS-304",
        "name": "MS-304 Recessed Spot Light",
        "image": "https://alburhan-asset.s3.eu-north-1.amazonaws.com/ms-lighting/products/8a1dabed39574e9cb091e523956a68a0.webp",
        "spec": "https://alburhan-asset.s3.eu-north-1.amazonaws.com/ms-lighting/products/9dfb9d255a9c4d339d768108454d4288.webp"
      },
      {
        "slug": "ms-329",
        "code": "MS-329",
        "name": "MS-329 Recessed Spot Light",
        "image": "https://alburhan-asset.s3.eu-north-1.amazonaws.com/ms-lighting/products/1f8a8a54f7eb40e9b3e80a5c80e1b5e7.webp",
        "spec": "https://alburhan-asset.s3.eu-north-1.amazonaws.com/ms-lighting/products/15aef9af34ca49fe821d43215d12e023.webp"
      },
      {
        "slug": "ms-328ar",
        "code": "MS-328AR",
        "name": "MS-328AR Recessed Spot Light",
        "image": "https://alburhan-asset.s3.eu-north-1.amazonaws.com/ms-lighting/products/fedbf9ee3f284fde935c9bcc043ec2af.webp",
        "spec": "https://alburhan-asset.s3.eu-north-1.amazonaws.com/ms-lighting/products/236bbd5f169543bdbd7c9db15d12f692.webp"
      },
      {
        "slug": "ms-347a",
        "code": "MS-347A",
        "name": "MS-347A Recessed Spot Light",
        "image": "https://alburhan-asset.s3.eu-north-1.amazonaws.com/ms-lighting/products/80ab623e1c6a42bead7f6457543f83df.webp",
        "spec": "https://alburhan-asset.s3.eu-north-1.amazonaws.com/ms-lighting/products/525fe228914042508068b9c385acc75e.webp"
      },
      {
        "slug": "ms-344",
        "code": "MS-344",
        "name": "MS-344 Recessed Spot Light",
        "image": "https://alburhan-asset.s3.eu-north-1.amazonaws.com/ms-lighting/products/7a29f6ee18e742a3acef188068512456.webp",
        "spec": "https://alburhan-asset.s3.eu-north-1.amazonaws.com/ms-lighting/products/12efad04b84d4069ac0458a70b4a64df.webp"
      },
      {
        "slug": "ms-350",
        "code": "MS-350",
        "name": "MS-350 Recessed Spot Light",
        "image": "https://alburhan-asset.s3.eu-north-1.amazonaws.com/ms-lighting/products/1ef65c2d2fc541d6836df3c1082734e9.webp",
        "spec": "https://alburhan-asset.s3.eu-north-1.amazonaws.com/ms-lighting/products/3bdf022199284f688ce2f218b59fb1da.webp"
      }
    ]
  },
  {
    "slug": "module-series",
    "name": "Module Series",
    "zone": "indoor",
    "tag": "Modular",
    "blurb": "Interchangeable optic modules that let one ceiling aperture serve several lighting jobs.",
    "image": "https://alburhan-asset.s3.eu-north-1.amazonaws.com/site/families/module-series.webp",
    "order": 5,
    "products": [
      {
        "slug": "m3",
        "code": "M3",
        "name": "M3 Module Series",
        "image": "https://alburhan-asset.s3.eu-north-1.amazonaws.com/ms-lighting/products/e04bf8bc01894f53bfc0c1ad19995bd7.webp",
        "spec": "https://alburhan-asset.s3.eu-north-1.amazonaws.com/ms-lighting/products/7fa24793727c423bb832cddcbdab51ad.webp"
      },
      {
        "slug": "m4",
        "code": "M4",
        "name": "M4 Module Series",
        "image": "https://alburhan-asset.s3.eu-north-1.amazonaws.com/ms-lighting/products/6b28a39de0634cf7a77f13ff938ddb3c.webp",
        "spec": "https://alburhan-asset.s3.eu-north-1.amazonaws.com/ms-lighting/products/099c2a93b4ba44fda8bd16d1f8b9bc8a.webp"
      },
      {
        "slug": "ms-s01q",
        "code": "MS-S01Q",
        "name": "MS-S01Q Module Series",
        "image": "https://alburhan-asset.s3.eu-north-1.amazonaws.com/ms-lighting/products/3e8b26718dde4afca2f89aaf77738fba.webp",
        "spec": "https://alburhan-asset.s3.eu-north-1.amazonaws.com/ms-lighting/products/5b22a937ad1e4693aa5637e85c77612c.webp"
      },
      {
        "slug": "ms-s01ir",
        "code": "MS-S01IR",
        "name": "MS-S01IR Module Series",
        "image": "https://alburhan-asset.s3.eu-north-1.amazonaws.com/ms-lighting/products/de8e98b796d0492baeeefec0db2bcd6f.webp",
        "spec": "https://alburhan-asset.s3.eu-north-1.amazonaws.com/ms-lighting/products/2a97f876ccf242159912f841aa0d8fda.webp"
      },
      {
        "slug": "rd01",
        "code": "RD01",
        "name": "RD01",
        "image": "https://alburhan-asset.s3.eu-north-1.amazonaws.com/ms-lighting/products/upshine/ff773c7761ba42198bdea817dc4be8d6.webp",
        "spec": "https://alburhan-asset.s3.eu-north-1.amazonaws.com/ms-lighting/products/upshine/0f5b80c4d7f04a5480fe064731c04efa.webp"
      },
      {
        "slug": "rd03",
        "code": "RD03",
        "name": "RD03",
        "image": "https://alburhan-asset.s3.eu-north-1.amazonaws.com/ms-lighting/products/upshine/d59bc31cb4bd4cfdac00b8e68be583b6.webp",
        "spec": "https://alburhan-asset.s3.eu-north-1.amazonaws.com/ms-lighting/products/upshine/04a88846c75447aa8a015e0521c083d6.webp"
      },
      {
        "slug": "rd05",
        "code": "RD05",
        "name": "RD05",
        "image": "https://alburhan-asset.s3.eu-north-1.amazonaws.com/ms-lighting/products/upshine/e48b72d8ac9740ac8ac8f7754dd6d831.webp",
        "spec": "https://alburhan-asset.s3.eu-north-1.amazonaws.com/ms-lighting/products/upshine/5d41fe2a0f364115bc6e7272e6860666.webp"
      },
      {
        "slug": "rd07a",
        "code": "RD07A",
        "name": "RD07A",
        "image": "https://alburhan-asset.s3.eu-north-1.amazonaws.com/ms-lighting/products/upshine/344ac7a6036949d192ca8510f3ca201a.webp",
        "spec": "https://alburhan-asset.s3.eu-north-1.amazonaws.com/ms-lighting/products/upshine/53d3468f550943688d674b2a56d40635.webp"
      },
      {
        "slug": "ck32",
        "code": "CK32",
        "name": "CK32",
        "image": "https://alburhan-asset.s3.eu-north-1.amazonaws.com/ms-lighting/products/upshine/046a7c90f02d4051b93d85998c750a3f.webp",
        "spec": "https://alburhan-asset.s3.eu-north-1.amazonaws.com/ms-lighting/products/upshine/acacf84810014dec8fd9b0a67d8b943b.webp"
      },
      {
        "slug": "ck21",
        "code": "CK21",
        "name": "CK21",
        "image": "https://alburhan-asset.s3.eu-north-1.amazonaws.com/ms-lighting/products/upshine/782116808f6d40f68484347be298b9e3.webp",
        "spec": "https://alburhan-asset.s3.eu-north-1.amazonaws.com/ms-lighting/products/upshine/1dd5ef929e2f461b8290ce1f60c6588d.webp"
      }
    ]
  },
  {
    "slug": "linear-light",
    "name": "Linear Light",
    "zone": "indoor",
    "tag": "Linear",
    "blurb": "Continuous runs — recessed, surface or suspended — for rhythm across long architectural spans.",
    "image": "https://alburhan-asset.s3.eu-north-1.amazonaws.com/site/families/linear-light.webp",
    "order": 6,
    "products": [
      {
        "slug": "ms-t8",
        "code": "MS-T8",
        "name": "MS-T8 Linear Light",
        "image": "https://alburhan-asset.s3.eu-north-1.amazonaws.com/ms-lighting/products/77726f0138574035adacc4dd94b74124.webp",
        "spec": "https://alburhan-asset.s3.eu-north-1.amazonaws.com/ms-lighting/products/08a7a8eaf9164f1d8d57d9647f75dc45.webp"
      },
      {
        "slug": "ms-t9",
        "code": "MS-T9",
        "name": "MS-T9 Linear Light",
        "image": "https://alburhan-asset.s3.eu-north-1.amazonaws.com/ms-lighting/products/0d62ca1078b74d228940fac405ab2458.webp",
        "spec": "https://alburhan-asset.s3.eu-north-1.amazonaws.com/ms-lighting/products/1989c2d35cc14b579fb38ebd7628ce94.webp"
      },
      {
        "slug": "ms-t14",
        "code": "MS-T14",
        "name": "MS-T14 Linear Light",
        "image": "https://alburhan-asset.s3.eu-north-1.amazonaws.com/ms-lighting/products/749606cc5a4142b087359b5fa3334ba9.webp",
        "spec": "https://alburhan-asset.s3.eu-north-1.amazonaws.com/ms-lighting/products/b21b1c6c652c4a948d588eaca8734fc8.webp"
      },
      {
        "slug": "ms-t17",
        "code": "MS-T17",
        "name": "MS-T17 Linear Light",
        "image": "https://alburhan-asset.s3.eu-north-1.amazonaws.com/ms-lighting/products/39f397d20f674e7cacfa9d840ae67f2c.webp",
        "spec": "https://alburhan-asset.s3.eu-north-1.amazonaws.com/ms-lighting/products/c3a85505cd4c4321885e77cd0858b97f.webp"
      },
      {
        "slug": "ms-t19",
        "code": "MS-T19",
        "name": "MS-T19 Linear Light",
        "image": "https://alburhan-asset.s3.eu-north-1.amazonaws.com/ms-lighting/products/dd77aa546eaf4ca791f32c64ef7c82c7.webp",
        "spec": "https://alburhan-asset.s3.eu-north-1.amazonaws.com/ms-lighting/products/a38f08ba76a94d8586e51c430e83a1c4.webp"
      },
      {
        "slug": "ms-t12",
        "code": "MS-T12",
        "name": "MS-T12 Tri-proof Linear Light",
        "image": "https://alburhan-asset.s3.eu-north-1.amazonaws.com/ms-lighting/products/0062bd8a73a64f2b95eff26ddfa59f68.webp",
        "spec": "https://alburhan-asset.s3.eu-north-1.amazonaws.com/ms-lighting/products/d31fa3ccdbc7436cb39f2b2666696456.webp"
      },
      {
        "slug": "ms-t21",
        "code": "MS-T21",
        "name": "MS-T21 Tri-proof Linear Light",
        "image": "https://alburhan-asset.s3.eu-north-1.amazonaws.com/ms-lighting/products/5bc29e6c145d4c18bdfcc9617f8e2942.webp",
        "spec": "https://alburhan-asset.s3.eu-north-1.amazonaws.com/ms-lighting/products/33767420d390490eb0f425597724e0c4.webp"
      },
      {
        "slug": "ms-t22",
        "code": "MS-T22",
        "name": "MS-T22 Tri-proof Linear Light",
        "image": "https://alburhan-asset.s3.eu-north-1.amazonaws.com/ms-lighting/products/64c5b5cb66a84f6399fe78fe56c60008.webp",
        "spec": "https://alburhan-asset.s3.eu-north-1.amazonaws.com/ms-lighting/products/7698f132d5ac478cb4450963157c29da.webp"
      },
      {
        "slug": "ol02",
        "code": "OL02",
        "name": "OL02",
        "image": "https://alburhan-asset.s3.eu-north-1.amazonaws.com/ms-lighting/products/upshine/4a2de5f6803341f0bb423f0b77928213.webp",
        "spec": "https://alburhan-asset.s3.eu-north-1.amazonaws.com/ms-lighting/products/upshine/1871143939124642b06d97b3dcdf5c3e.webp"
      },
      {
        "slug": "ol06",
        "code": "OL06",
        "name": "OL06",
        "image": "https://alburhan-asset.s3.eu-north-1.amazonaws.com/ms-lighting/products/upshine/84962b8b7d8341f09c7be57b735ae1e1.webp",
        "spec": "https://alburhan-asset.s3.eu-north-1.amazonaws.com/ms-lighting/products/upshine/29698a47ae73438abf51fe0cfe4d530a.webp"
      },
      {
        "slug": "ol07",
        "code": "OL07",
        "name": "OL07",
        "image": "https://alburhan-asset.s3.eu-north-1.amazonaws.com/ms-lighting/products/upshine/45d453d0fb78436eb82a280162b96abc.webp",
        "spec": "https://alburhan-asset.s3.eu-north-1.amazonaws.com/ms-lighting/products/upshine/31b3bbbebc774684b27a79ea3c6bc888.webp"
      },
      {
        "slug": "db160",
        "code": "DB160",
        "name": "DB160",
        "image": "https://alburhan-asset.s3.eu-north-1.amazonaws.com/ms-lighting/products/upshine/a089885e5152435e896dec2c40a70d9e.webp",
        "spec": "https://alburhan-asset.s3.eu-north-1.amazonaws.com/ms-lighting/products/upshine/401070db479b4b6a8ae76094ca1e1369.webp"
      },
      {
        "slug": "db05",
        "code": "DB05",
        "name": "DB05",
        "image": "https://alburhan-asset.s3.eu-north-1.amazonaws.com/ms-lighting/products/upshine/ab3d848921e74647b949838b0ddf4b2a.webp",
        "spec": "https://alburhan-asset.s3.eu-north-1.amazonaws.com/ms-lighting/products/upshine/52635fe678824d81a9f500849a019f92.webp"
      },
      {
        "slug": "db199",
        "code": "DB199",
        "name": "DB199",
        "image": "https://alburhan-asset.s3.eu-north-1.amazonaws.com/ms-lighting/products/upshine/596f9f984f55449d94980c29f107d97a.webp",
        "spec": "https://alburhan-asset.s3.eu-north-1.amazonaws.com/ms-lighting/products/upshine/e81e5a5953594fb8b43fe9eed5055b24.webp"
      }
    ]
  },
  {
    "slug": "track-spot-light",
    "name": "Track Spot Light",
    "zone": "indoor",
    "tag": "Track",
    "blurb": "Re-aimable heads on a live rail, for retail and showroom layouts that change with the season.",
    "image": "https://alburhan-asset.s3.eu-north-1.amazonaws.com/site/families/track-spot-light.webp",
    "order": 7,
    "products": [
      {
        "slug": "ms-601c",
        "code": "MS-601C",
        "name": "MS-601C Track Spot Light",
        "image": "https://alburhan-asset.s3.eu-north-1.amazonaws.com/ms-lighting/products/1ea4f1bc6b3d4e739760a80deee1c9a9.webp",
        "spec": "https://alburhan-asset.s3.eu-north-1.amazonaws.com/ms-lighting/products/c9fa16b7645d4ce3a3311cac5fae4a25.webp"
      },
      {
        "slug": "ms-602",
        "code": "MS-602",
        "name": "MS-602 Track Spot Light",
        "image": "https://alburhan-asset.s3.eu-north-1.amazonaws.com/ms-lighting/products/863f4b17ac934addab9aa6e3137570ac.webp",
        "spec": "https://alburhan-asset.s3.eu-north-1.amazonaws.com/ms-lighting/products/91aa9f701437414894a5acf55f91e9e0.webp"
      },
      {
        "slug": "tl29b",
        "code": "TL29B",
        "name": "TL29B",
        "image": "https://alburhan-asset.s3.eu-north-1.amazonaws.com/ms-lighting/products/upshine/a7cb1dea311943ba81ff1ea4c20d6bda.webp",
        "spec": "https://alburhan-asset.s3.eu-north-1.amazonaws.com/ms-lighting/products/upshine/a5eca0233d004a6d97ee37e853cfba63.webp"
      },
      {
        "slug": "tl29e",
        "code": "TL29E",
        "name": "TL29E",
        "image": "https://alburhan-asset.s3.eu-north-1.amazonaws.com/ms-lighting/products/upshine/355c98746fa94635ad28917c1b4c2619.webp",
        "spec": "https://alburhan-asset.s3.eu-north-1.amazonaws.com/ms-lighting/products/upshine/5187d12e95ea496991add78b828cbcbe.webp"
      },
      {
        "slug": "tl228",
        "code": "TL228",
        "name": "TL228",
        "image": "https://alburhan-asset.s3.eu-north-1.amazonaws.com/ms-lighting/products/upshine/94d6a04140e94434988c6e72cd36bcf4.webp",
        "spec": "https://alburhan-asset.s3.eu-north-1.amazonaws.com/ms-lighting/products/upshine/42e52435696d441897143850b6f27715.webp"
      },
      {
        "slug": "tl90",
        "code": "TL90",
        "name": "TL90",
        "image": "https://alburhan-asset.s3.eu-north-1.amazonaws.com/ms-lighting/products/upshine/6628ae62504548899054a3f98c458cf5.webp",
        "spec": "https://alburhan-asset.s3.eu-north-1.amazonaws.com/ms-lighting/products/upshine/9b09997b5cfb42a6854df9d86126bf89.webp"
      },
      {
        "slug": "tl69a",
        "code": "TL69A",
        "name": "TL69A",
        "image": "https://alburhan-asset.s3.eu-north-1.amazonaws.com/ms-lighting/products/upshine/95ffcf7029344eb6a8d2e97f7476d4cf.webp",
        "spec": "https://alburhan-asset.s3.eu-north-1.amazonaws.com/ms-lighting/products/upshine/f5cf9ffc66a64fc5b6e5dde6296d2189.webp"
      },
      {
        "slug": "tl69b",
        "code": "TL69B",
        "name": "TL69B",
        "image": "https://alburhan-asset.s3.eu-north-1.amazonaws.com/ms-lighting/products/upshine/046340c977b548ffb3fcbf84365f7569.webp",
        "spec": "https://alburhan-asset.s3.eu-north-1.amazonaws.com/ms-lighting/products/upshine/d0af2261c0864ffdb1a8598ea6382530.webp"
      }
    ]
  },
  {
    "slug": "magnet-light",
    "name": "Magnet Light",
    "zone": "indoor",
    "tag": "Magnetic",
    "blurb": "Low-voltage magnetic rail: spots, floods and linears repositioned by hand, no tools.",
    "image": "https://alburhan-asset.s3.eu-north-1.amazonaws.com/site/families/magnet-light.webp",
    "order": 8,
    "products": [
      {
        "slug": "ms20y",
        "code": "MS20Y",
        "name": "MS20Y Magnet Light",
        "image": "https://alburhan-asset.s3.eu-north-1.amazonaws.com/ms-lighting/products/63bd9edb729e4c09b9208579dae10504.webp",
        "spec": "https://alburhan-asset.s3.eu-north-1.amazonaws.com/ms-lighting/products/103f068dee174cee9b472bd201b5d946.webp"
      },
      {
        "slug": "ms20s",
        "code": "MS20S",
        "name": "MS20S Magnet Light",
        "image": "https://alburhan-asset.s3.eu-north-1.amazonaws.com/ms-lighting/products/feebba4d22eb4644a5560be0a0f8d9a7.webp",
        "spec": "https://alburhan-asset.s3.eu-north-1.amazonaws.com/ms-lighting/products/12408a9a77784fcd96696948ec90f875.webp"
      },
      {
        "slug": "ms20y-g",
        "code": "MS20Y-G",
        "name": "MS20Y Magnet Grille Light",
        "image": "https://alburhan-asset.s3.eu-north-1.amazonaws.com/ms-lighting/products/d313dbc25b88429f87994e4216fa19cb.webp",
        "spec": "https://alburhan-asset.s3.eu-north-1.amazonaws.com/ms-lighting/products/d3fd5c7846d94c018722ec525bf2a9e8.webp"
      },
      {
        "slug": "ms16s",
        "code": "MS16S",
        "name": "MS16S Magnet Light",
        "image": "https://alburhan-asset.s3.eu-north-1.amazonaws.com/ms-lighting/products/c988f0a86de64191b78458c0abc95d53.webp",
        "spec": "https://alburhan-asset.s3.eu-north-1.amazonaws.com/ms-lighting/products/0ca9d9b0370d47d793258742ed206f83.webp"
      },
      {
        "slug": "ms35y",
        "code": "MS35Y",
        "name": "MS35Y Magnet Light",
        "image": "https://alburhan-asset.s3.eu-north-1.amazonaws.com/ms-lighting/products/afcbf594e7bb45eb853e137cc45c250a.webp",
        "spec": "https://alburhan-asset.s3.eu-north-1.amazonaws.com/ms-lighting/products/5a3df23256da4f5e968b952824d970fd.webp"
      },
      {
        "slug": "dc-tl142-3710-18w",
        "code": "DC-TL142-3710-18W",
        "name": "DC-TL142-3710-18W",
        "image": "https://alburhan-asset.s3.eu-north-1.amazonaws.com/ms-lighting/products/upshine/60fda1346bba42158bde0bc06f2bbf55.webp",
        "spec": "https://alburhan-asset.s3.eu-north-1.amazonaws.com/ms-lighting/products/upshine/74ee26fb07cf43d69ca13c4e712bc4aa.webp"
      },
      {
        "slug": "dc-tl142-230-18w",
        "code": "DC-TL142-230-18W",
        "name": "DC-TL142-230-18W",
        "image": "https://alburhan-asset.s3.eu-north-1.amazonaws.com/ms-lighting/products/upshine/52fa97df3e23404d8ba3dbc75cee27f1.webp",
        "spec": "https://alburhan-asset.s3.eu-north-1.amazonaws.com/ms-lighting/products/upshine/cbf9e004ef13450b84109565b706f17b.webp"
      },
      {
        "slug": "dc-pd142-5067-9w",
        "code": "DC-PD142-5067-9W",
        "name": "DC-PD142-5067-9W",
        "image": "https://alburhan-asset.s3.eu-north-1.amazonaws.com/ms-lighting/products/upshine/3fd3899e9c374196811937f6bdfbb3a0.webp",
        "spec": "https://alburhan-asset.s3.eu-north-1.amazonaws.com/ms-lighting/products/upshine/81ba0f89ed064ed5aba2b2f4bc57f05f.webp"
      },
      {
        "slug": "dc-pd145-3030-5w",
        "code": "DC-PD145-3030-5W",
        "name": "DC-PD145-3030-5W",
        "image": "https://alburhan-asset.s3.eu-north-1.amazonaws.com/ms-lighting/products/upshine/cecd064f5f56429b97488d2f614456ff.webp",
        "spec": "https://alburhan-asset.s3.eu-north-1.amazonaws.com/ms-lighting/products/upshine/5dfd545afa7c467fbe38c74b0208b6c7.webp"
      },
      {
        "slug": "dc-pd145-3060-7w",
        "code": "DC-PD145-3060-7W",
        "name": "DC-PD145-3060-7W",
        "image": "https://alburhan-asset.s3.eu-north-1.amazonaws.com/ms-lighting/products/upshine/c7c2c58eadb04c56965cab67731c9c06.webp",
        "spec": "https://alburhan-asset.s3.eu-north-1.amazonaws.com/ms-lighting/products/upshine/05d0e3b07ba3413dad46205375fd7982.webp"
      },
      {
        "slug": "dc-pd142-5046-7w",
        "code": "DC-PD142-5046-7W",
        "name": "DC-PD142-5046-7W",
        "image": "https://alburhan-asset.s3.eu-north-1.amazonaws.com/ms-lighting/products/upshine/0c786369eff34946b94676281103b977.webp",
        "spec": "https://alburhan-asset.s3.eu-north-1.amazonaws.com/ms-lighting/products/upshine/f893574ddaa84ec28c1a536ba903d72a.webp"
      }
    ]
  },
  {
    "slug": "wall-light",
    "name": "Wall Light",
    "zone": "outdoor",
    "tag": "Façade",
    "blurb": "Up, down and grazing wall optics that build the night elevation of a building.",
    "image": "https://alburhan-asset.s3.eu-north-1.amazonaws.com/site/families/wall-light.webp",
    "order": 9,
    "products": [
      {
        "slug": "ms-w13",
        "code": "MS-W13",
        "name": "MS-W13 Wall Light",
        "image": "https://alburhan-asset.s3.eu-north-1.amazonaws.com/ms-lighting/products/48f57ca809644b00a18e07ff652d0c16.webp",
        "spec": "https://alburhan-asset.s3.eu-north-1.amazonaws.com/ms-lighting/products/64c3e965be114755bdb95fb3698d1102.webp"
      },
      {
        "slug": "ms-w26",
        "code": "MS-W26",
        "name": "MS-W26 Wall Light",
        "image": "https://alburhan-asset.s3.eu-north-1.amazonaws.com/ms-lighting/products/8d56a53af7644b208a990a224b6e743b.webp",
        "spec": "https://alburhan-asset.s3.eu-north-1.amazonaws.com/ms-lighting/products/5b76cac3fa534cd6ab155c6018284595.webp"
      },
      {
        "slug": "ms-w01",
        "code": "MS-W01",
        "name": "MS-W01 Wall Light",
        "image": "https://alburhan-asset.s3.eu-north-1.amazonaws.com/ms-lighting/products/4667c70762864c728cfcec4c7d972882.webp",
        "spec": "https://alburhan-asset.s3.eu-north-1.amazonaws.com/ms-lighting/products/4f19144e3fa24e0eb44a00ea97de85c8.webp"
      },
      {
        "slug": "ms-w07a",
        "code": "MS-W07A",
        "name": "MS-W07A Wall Light",
        "image": "https://alburhan-asset.s3.eu-north-1.amazonaws.com/ms-lighting/products/5b5be9f51d97477b9225534e6308b0ce.webp",
        "spec": "https://alburhan-asset.s3.eu-north-1.amazonaws.com/ms-lighting/products/dc702dbf41c148b28683863029f71a41.webp"
      },
      {
        "slug": "ms-w06a",
        "code": "MS-W06A",
        "name": "MS-W06A Wall Light",
        "image": "https://alburhan-asset.s3.eu-north-1.amazonaws.com/ms-lighting/products/ef7d2ddc2476464f80ea7cc854f4c24e.webp",
        "spec": "https://alburhan-asset.s3.eu-north-1.amazonaws.com/ms-lighting/products/70c86d853547418ba140f29289f34ae0.webp"
      },
      {
        "slug": "wl146",
        "code": "WL146",
        "name": "WL146",
        "image": "https://alburhan-asset.s3.eu-north-1.amazonaws.com/ms-lighting/products/upshine/0947a9c8bef1428bb20ae9a9bb0ab3c7.webp",
        "spec": "https://alburhan-asset.s3.eu-north-1.amazonaws.com/ms-lighting/products/upshine/04b9442a29d64b318f90176e5ea30e12.webp"
      },
      {
        "slug": "wl141",
        "code": "WL141",
        "name": "WL141",
        "image": "https://alburhan-asset.s3.eu-north-1.amazonaws.com/ms-lighting/products/upshine/c6116af89d8e489183563c4ceeb7003a.webp",
        "spec": "https://alburhan-asset.s3.eu-north-1.amazonaws.com/ms-lighting/products/upshine/a56d27b1bce848e482746db59773f3fc.webp"
      },
      {
        "slug": "wl161",
        "code": "WL161",
        "name": "WL161",
        "image": "https://alburhan-asset.s3.eu-north-1.amazonaws.com/ms-lighting/products/upshine/6421bfdabb5a4a299e8f21147d736cae.webp",
        "spec": "https://alburhan-asset.s3.eu-north-1.amazonaws.com/ms-lighting/products/upshine/69c09d59bcb34c3da425076ea0df2eea.webp"
      },
      {
        "slug": "wl175c",
        "code": "WL175C",
        "name": "WL175C",
        "image": "https://alburhan-asset.s3.eu-north-1.amazonaws.com/ms-lighting/products/upshine/b121c9b7c8ae402595923cc5eb7322b4.webp",
        "spec": "https://alburhan-asset.s3.eu-north-1.amazonaws.com/ms-lighting/products/upshine/0433c4e048754fcd8e2278478949d2e7.webp"
      },
      {
        "slug": "wl101",
        "code": "WL101",
        "name": "WL101",
        "image": "https://alburhan-asset.s3.eu-north-1.amazonaws.com/ms-lighting/products/upshine/f3324d24df744c56979d480aa5375847.webp",
        "spec": "https://alburhan-asset.s3.eu-north-1.amazonaws.com/ms-lighting/products/upshine/b3fc4eaedd314aeb982c43c2d6816ca8.webp"
      },
      {
        "slug": "wl102",
        "code": "WL102",
        "name": "WL102",
        "image": "https://alburhan-asset.s3.eu-north-1.amazonaws.com/ms-lighting/products/upshine/00af3e87f3974f6eb4473d567c48f153.webp",
        "spec": "https://alburhan-asset.s3.eu-north-1.amazonaws.com/ms-lighting/products/upshine/f0a54dc3c48d455db36a2be43940bc3a.webp"
      }
    ]
  },
  {
    "slug": "lawn-light",
    "name": "Lawn Light",
    "zone": "outdoor",
    "tag": "Landscape",
    "blurb": "Bollards and lawn heads that mark paths and planting without spilling into the sky.",
    "image": "https://alburhan-asset.s3.eu-north-1.amazonaws.com/site/families/lawn-light.webp",
    "order": 10,
    "products": [
      {
        "slug": "ms-l01a",
        "code": "MS-L01A",
        "name": "MS-L01A Lawn Light",
        "image": "https://alburhan-asset.s3.eu-north-1.amazonaws.com/ms-lighting/products/6cb0bcfc5a994946b7dc73e989f1083a.webp",
        "spec": "https://alburhan-asset.s3.eu-north-1.amazonaws.com/ms-lighting/products/54ab9c46b6bb4d08a432f97e6b32e94e.webp"
      },
      {
        "slug": "ms-l02",
        "code": "MS-L02",
        "name": "MS-L02 Lawn Light",
        "image": "https://alburhan-asset.s3.eu-north-1.amazonaws.com/ms-lighting/products/87b629bc5ede4dbda1ff5feb04d064ab.webp",
        "spec": "https://alburhan-asset.s3.eu-north-1.amazonaws.com/ms-lighting/products/489bbf594bdc45b58f65f94a5dddae1b.webp"
      },
      {
        "slug": "nl154a",
        "code": "NL154A",
        "name": "NL154A",
        "image": "https://alburhan-asset.s3.eu-north-1.amazonaws.com/ms-lighting/products/upshine/1076178b8044403c90c8485c62354176.webp",
        "spec": "https://alburhan-asset.s3.eu-north-1.amazonaws.com/ms-lighting/products/upshine/8580a5e0dacd490fb4064b78f3cf9e19.webp"
      },
      {
        "slug": "nl06",
        "code": "NL06",
        "name": "NL06",
        "image": "https://alburhan-asset.s3.eu-north-1.amazonaws.com/ms-lighting/products/upshine/10b187f1935f4485998472f4659f4ed3.webp",
        "spec": "https://alburhan-asset.s3.eu-north-1.amazonaws.com/ms-lighting/products/upshine/1cc3fa01e618406e8928ae7d81b759ff.webp"
      },
      {
        "slug": "sol01",
        "code": "SOL01",
        "name": "SOL01",
        "image": "https://alburhan-asset.s3.eu-north-1.amazonaws.com/ms-lighting/products/upshine/a53839c8b5e549c3aff9d05c3d1e76d5.webp",
        "spec": "https://alburhan-asset.s3.eu-north-1.amazonaws.com/ms-lighting/products/upshine/1874f79937c64e04ba949a655eeceec2.webp"
      },
      {
        "slug": "nl154c",
        "code": "NL154C",
        "name": "NL154C",
        "image": "https://alburhan-asset.s3.eu-north-1.amazonaws.com/ms-lighting/products/upshine/84dfce490cf3478598ca4aec45b28e55.webp",
        "spec": "https://alburhan-asset.s3.eu-north-1.amazonaws.com/ms-lighting/products/upshine/e5f1887a750d48f29f599cbed3a1e862.webp"
      },
      {
        "slug": "nl18",
        "code": "NL18",
        "name": "NL18",
        "image": "https://alburhan-asset.s3.eu-north-1.amazonaws.com/ms-lighting/products/upshine/455df1d5ee7e4b078cca3237c81f1cd4.webp",
        "spec": "https://alburhan-asset.s3.eu-north-1.amazonaws.com/ms-lighting/products/upshine/578561ee176940c3bc80736934caa1c9.webp"
      },
      {
        "slug": "nl90a",
        "code": "NL90A",
        "name": "NL90A",
        "image": "https://alburhan-asset.s3.eu-north-1.amazonaws.com/ms-lighting/products/upshine/ca30671b3c9c4dbe809b06e07d66e989.webp",
        "spec": "https://alburhan-asset.s3.eu-north-1.amazonaws.com/ms-lighting/products/upshine/4d3a4cd99d9c4b2b8a0e85163aeb3200.webp"
      }
    ]
  },
  {
    "slug": "street-light",
    "name": "Street Light",
    "zone": "outdoor",
    "tag": "Street",
    "blurb": "Road and car-park optics with the distribution curves specifiers actually have to prove.",
    "image": "https://alburhan-asset.s3.eu-north-1.amazonaws.com/site/families/street-light.webp",
    "order": 11,
    "products": [
      {
        "slug": "ms-s11a",
        "code": "MS-S11A",
        "name": "MS-S11A Street Light",
        "image": "https://alburhan-asset.s3.eu-north-1.amazonaws.com/ms-lighting/products/76388d61555040bc8146687fd28ca5c9.webp",
        "spec": "https://alburhan-asset.s3.eu-north-1.amazonaws.com/ms-lighting/products/cf96c5d5d37a4c5ab51addaf9e0367ff.webp"
      }
    ]
  },
  {
    "slug": "flood-light",
    "name": "Flood Light",
    "zone": "outdoor",
    "tag": "Flood",
    "blurb": "Wide-throw fixtures for yards, sports areas, façades and site security.",
    "image": "https://alburhan-asset.s3.eu-north-1.amazonaws.com/site/families/flood-light.webp",
    "order": 12,
    "products": [
      {
        "slug": "ms-413",
        "code": "MS-413",
        "name": "MS-413 LED Flood Light",
        "image": "https://alburhan-asset.s3.eu-north-1.amazonaws.com/ms-lighting/products/37fbe44a0a304260b9e59a8ecbe41724.webp",
        "spec": "https://alburhan-asset.s3.eu-north-1.amazonaws.com/ms-lighting/products/b72b94a7d37b4c0a900450421d93f084.webp"
      },
      {
        "slug": "ms-415",
        "code": "MS-415",
        "name": "MS-415 LED Flood Light",
        "image": "https://alburhan-asset.s3.eu-north-1.amazonaws.com/ms-lighting/products/b1945d61ccd74dcca71a3327dd45063e.webp",
        "spec": "https://alburhan-asset.s3.eu-north-1.amazonaws.com/ms-lighting/products/794f6fa9a9de4cac961ff7f5f7ec0a1e.webp"
      },
      {
        "slug": "fl14",
        "code": "FL14",
        "name": "FL14",
        "image": "https://alburhan-asset.s3.eu-north-1.amazonaws.com/ms-lighting/products/upshine/53fdb9a75ed64b7db8c998e96999c26f.webp",
        "spec": "https://alburhan-asset.s3.eu-north-1.amazonaws.com/ms-lighting/products/upshine/508eec3c336646c286b76841ff6299a4.webp"
      }
    ]
  },
  {
    "slug": "high-bay",
    "name": "High Bay",
    "zone": "indoor",
    "tag": "Industrial",
    "blurb": "High-output fixtures engineered for warehouse and production-floor mounting heights.",
    "image": "https://alburhan-asset.s3.eu-north-1.amazonaws.com/site/families/high-bay.webp",
    "order": 13,
    "products": [
      {
        "slug": "van-t08",
        "code": "VAN-T08",
        "name": "VAN-T08 High Bay",
        "image": "https://alburhan-asset.s3.eu-north-1.amazonaws.com/ms-lighting/products/c6388b829caa4056b04c9c3241d2feeb.webp",
        "spec": "https://alburhan-asset.s3.eu-north-1.amazonaws.com/ms-lighting/products/b784ccac368d4dd68b70deaf5f7494f6.webp"
      }
    ]
  },
  {
    "slug": "ceiling-light",
    "name": "Ceiling Light",
    "zone": "indoor",
    "tag": "Decorative",
    "blurb": "Surface ceiling fixtures for residential and hospitality rooms where the fitting is seen.",
    "image": "https://alburhan-asset.s3.eu-north-1.amazonaws.com/site/families/ceiling-light.webp",
    "order": 14,
    "products": [
      {
        "slug": "ms-o1",
        "code": "MS-O1",
        "name": "MS-O1 Ceiling Light",
        "image": "https://alburhan-asset.s3.eu-north-1.amazonaws.com/ms-lighting/products/e74a9b7f9ca44fa58d43c4ffecf4474a.webp",
        "spec": "https://alburhan-asset.s3.eu-north-1.amazonaws.com/ms-lighting/products/006d8e2f6332460c89d3b7145a938e52.webp"
      },
      {
        "slug": "cl156",
        "code": "CL156",
        "name": "CL156",
        "image": "https://alburhan-asset.s3.eu-north-1.amazonaws.com/ms-lighting/products/upshine/f098f1387078479583568e7e007ad8ca.webp",
        "spec": "https://alburhan-asset.s3.eu-north-1.amazonaws.com/ms-lighting/products/upshine/6d0f14c3a65f44749b735a615fb9b0fd.webp"
      },
      {
        "slug": "cl178",
        "code": "CL178",
        "name": "CL178",
        "image": "https://alburhan-asset.s3.eu-north-1.amazonaws.com/ms-lighting/products/upshine/7f3703fafac548759fc5c9765120f8ed.webp",
        "spec": "https://alburhan-asset.s3.eu-north-1.amazonaws.com/ms-lighting/products/upshine/6ef73d584bb04c96b0d304692c99be34.webp"
      },
      {
        "slug": "cl113a",
        "code": "CL113A",
        "name": "CL113A",
        "image": "https://alburhan-asset.s3.eu-north-1.amazonaws.com/ms-lighting/products/upshine/6306ec7d8dfb4d8e9154333e8ffe5669.webp",
        "spec": "https://alburhan-asset.s3.eu-north-1.amazonaws.com/ms-lighting/products/upshine/e5d47bf210c2433e8dd023aa2bcaa93b.webp"
      },
      {
        "slug": "cl146",
        "code": "CL146",
        "name": "CL146",
        "image": "https://alburhan-asset.s3.eu-north-1.amazonaws.com/ms-lighting/products/upshine/19cfd20acef242e4a2466aa2c34339ad.webp",
        "spec": "https://alburhan-asset.s3.eu-north-1.amazonaws.com/ms-lighting/products/upshine/5b8b22e94bc148d2abec8707da1118df.webp"
      },
      {
        "slug": "cl113b",
        "code": "CL113B",
        "name": "CL113B",
        "image": "https://alburhan-asset.s3.eu-north-1.amazonaws.com/ms-lighting/products/upshine/954ba71b83104c6b80c8344ada2ced25.webp",
        "spec": "https://alburhan-asset.s3.eu-north-1.amazonaws.com/ms-lighting/products/upshine/40c6e4ae13a04fef9d9cb4adfbf58005.webp"
      },
      {
        "slug": "cl448",
        "code": "CL448",
        "name": "CL448",
        "image": "https://alburhan-asset.s3.eu-north-1.amazonaws.com/ms-lighting/products/upshine/676ec759b0ce4313b69d346f798ed311.webp",
        "spec": "https://alburhan-asset.s3.eu-north-1.amazonaws.com/ms-lighting/products/upshine/641765358e7648f287f52630ea7bc664.webp"
      }
    ]
  }
];

export const CATALOG_FAMILY_COUNT = CATALOG.length;
export const CATALOG_MODEL_COUNT = CATALOG.reduce((n, f) => n + f.products.length, 0);

export function familiesByZone(zone: CatalogZone): CatalogFamily[] {
  return CATALOG.filter((f) => f.zone === zone);
}

export function findFamily(slug: string): CatalogFamily | undefined {
  return CATALOG.find((f) => f.slug === slug);
}

export function findModel(
  familySlug: string,
  modelSlug: string,
): { family: CatalogFamily; model: CatalogModel } | undefined {
  const family = findFamily(familySlug);
  const model = family?.products.find((p) => p.slug === modelSlug);
  return family && model ? { family, model } : undefined;
}

/** Every model paired with its family — used by the catalogue index and search. */
export function allModels(): { family: CatalogFamily; model: CatalogModel }[] {
  return CATALOG.flatMap((family) => family.products.map((model) => ({ family, model })));
}
