const animeData = {
  "opm2especiales": {
    "name": "One Punch Man 2: Especiales",
    "idLatino": null,
    "idJapones": "190675",
    "imgUrl": "https://res.cloudinary.com/dj5v7zdxp/image/upload/v1748740341/opm-especiales2_xxehl6.jpg",
    "relaciones": {
      "serie": ["opm2"],          
      "precuela": "opm"
    }
  },

  "opm1especiales": {
    "name": "One Punch Man: Especiales",
    "idLatino": null,
    "idJapones": "190673",
    "imgUrl": "https://res.cloudinary.com/dj5v7zdxp/image/upload/v1748740341/opm-especiales1_vikbtq.webp",
    "relaciones": {
      "serie": "opm"
    }
  },

  "opmOva": {
    "name": "One Punch Man: Road to Hero (OVA)",
    "idLatino": null,
    "idJapones": "190672",
    "imgUrl": "https://res.cloudinary.com/dj5v7zdxp/image/upload/v1748728626/opm-ova_hf7m6z.webp",
    "relaciones": {
      "serie": ["opm", "opm2"]   // corregido a array para no duplicar la llave
    }
  },

  "opm2": {
    "name": "One Punch Man 2",
    "idLatino": "190667",
    "idJapones": "190545",
    "imgUrl": "https://res.cloudinary.com/dj5v7zdxp/image/upload/v1748727436/One_Punch_Man_2T_Anime_c1orqv.webp",
    "relaciones": {
      "precuela": "opm",
      "ovas": "opmOva",
      "especiales": "opm2especiales"
    }
  },

  "opm": {
    "name": "One Punch Man",
    "idLatino": "181308",
    "idJapones": "181572",
    "imgUrl": "https://res.cloudinary.com/dj5v7zdxp/image/upload/v1748377140/One_Punch_Man_hnv4pt.webp",
    "relaciones": {
      "secuela": "opm2",
      "ovas": "opmOva",
      "especiales": "opm1especiales"
    }
  },

  "zatchbell": {
    "name": "ZatchBell",
    "idLatino": "182957",
    "idJapones": "190680",
    "imgUrl": "https://res.cloudinary.com/dj5v7zdxp/image/upload/v1748312916/zatchbell_yenllr.jpg"
  },

  "lazarus": {
    "name": "Lazarus",
    "idLatino": null,
    "idJapones": "181857",
    "imgUrl": "https://res.cloudinary.com/dj5v7zdxp/image/upload/v1748377937/Lazarus_sse3kt.webp"
  },

  "bleach": {
    "name": "Bleach",
    "idLatino": null,
    "idJapones": null,
    "imgUrl": "https://res.cloudinary.com/dj5v7zdxp/image/upload/v1748377126/Bleach_Serie_de_TV-235942666-large_akgxc5.jpg"
  },

  "onepiece": {
    "name": "One Piece",
    "idLatino": null,
    "idJapones": null,
    "imgUrl": "https://res.cloudinary.com/dj5v7zdxp/image/upload/v1748377146/One_Piece_mokvom.webp"
  },

  "attackontitan": {
    "name": "Attack on Titan",
    "idLatino": null,
    "idJapones": null,
    "imgUrl": "https://res.cloudinary.com/dj5v7zdxp/image/upload/v1748377119/images_ojfbb9.jpg"
  },

  "myheroacademia": {
    "name": "My Hero Academia",
    "idLatino": null,
    "idJapones": null,
    "imgUrl": "https://res.cloudinary.com/dj5v7zdxp/image/upload/v1748377136/MV5BNzgxMzI3NzgtYzE2Zi00MzlmLThlNWEtNWVmZWEyZjNkZWYyXkEyXkFqcGc_._V1_FMjpg_UX1000__ryemcd.jpg"
  },

  "demonhunter": {
    "name": "Demon Slayer",
    "idLatino": null,
    "idJapones": null,
    "imgUrl": "https://res.cloudinary.com/dj5v7zdxp/image/upload/v1748377151/2ZfAUG5CTXdM34S1OhmMW1zF_oec7fa.webp"
  },

  "deathnote": {
    "name": "Death Note",
    "idLatino": null,
    "idJapones": null,
    "imgUrl": "https://res.cloudinary.com/dj5v7zdxp/image/upload/v1748377129/DeathNote_mbzjvx.jpg"
  },

  "hunterxhunter": {
    "name": "Hunter x Hunter",
    "idLatino": null,
    "idJapones": null,
    "imgUrl": "https://res.cloudinary.com/dj5v7zdxp/image/upload/v1748377118/HunterxHunter_m9g9jm.jpg"
  },

  "fullmetalalchemist": {
    "name": "Fullmetal Alchemist",
    "idLatino": null,
    "idJapones": null,
    "imgUrl": "https://res.cloudinary.com/dj5v7zdxp/image/upload/v1748377120/FullMetalAlchemist_xfj938.jpg"
  },

  "swordartonline": {
    "name": "Sword Art Online",
    "idLatino": null,
    "idJapones": null,
    "imgUrl": "https://res.cloudinary.com/dj5v7zdxp/image/upload/v1748377117/SwordArtOnline_xxedsb.webp"
  },

  "tokyoghoul": {
    "name": "Tokyo Ghoul",
    "idLatino": null,
    "idJapones": null,
    "imgUrl": "https://res.cloudinary.com/dj5v7zdxp/image/upload/v1748387018/TokyoGhoul_mutlue.jpg"
  },

  "jutsu": {
    "name": "Jujutsu Kaisen",
    "idLatino": null,
    "idJapones": null,
    "imgUrl": "https://res.cloudinary.com/dj5v7zdxp/image/upload/v1748387022/JujutsuKaisen_i0ilst.webp"
  },

  "blackclover": {
    "name": "Black Clover",
    "idLatino": null,
    "idJapones": null,
    "imgUrl": "https://res.cloudinary.com/dj5v7zdxp/image/upload/v1748387012/BlackClover_p2drjw.jpg"
  },

  "fairytail": {
    "name": "Fairy Tail",
    "idLatino": null,
    "idJapones": null,
    "imgUrl": "https://res.cloudinary.com/dj5v7zdxp/image/upload/v1748387009/FairyTail_sxdhup.jpg"
  },

  "assassinationclassroom": {
    "name": "Assassination Classroom",
    "idLatino": null,
    "idJapones": null,
    "imgUrl": "https://res.cloudinary.com/dj5v7zdxp/image/upload/v1748387012/assassinationclassroom_xhq2iw.webp"
  },

  "steinsgate": {
    "name": "Steins;Gate",
    "idLatino": null,
    "idJapones": null,
    "imgUrl": "https://res.cloudinary.com/dj5v7zdxp/image/upload/v1748387004/SteinsGate_vc2z2d.jpg"
  },

  "codegeass": {
    "name": "Code Geass",
    "idLatino": null,
    "idJapones": null,
    "imgUrl": "https://res.cloudinary.com/dj5v7zdxp/image/upload/v1748387000/Codegeass_dx40u0.webp"
  },

  "neongenesis": {
    "name": "Neon Genesis Evangelion",
    "idLatino": null,
    "idJapones": null,
    "imgUrl": "https://res.cloudinary.com/dj5v7zdxp/image/upload/v1748386999/Evangelion_pjgrye.jpg"
  },

  "vinland": {
    "name": "Vinland Saga",
    "idLatino": null,
    "idJapones": null,
    "imgUrl": "https://res.cloudinary.com/dj5v7zdxp/image/upload/v1748389025/VinlandSaga_ovxlvv.webp"
  },

  "mobpsycho": {
    "name": "Mob Psycho 100",
    "idLatino": null,
    "idJapones": null,
    "imgUrl": "https://res.cloudinary.com/dj5v7zdxp/image/upload/v1748389025/Mob_Psycho_100_poster_qnrrsr.webp"
  },

  "parasyte": {
    "name": "Parasyte",
    "idLatino": null,
    "idJapones": null,
    "imgUrl": "https://res.cloudinary.com/dj5v7zdxp/image/upload/v1748389022/Parasyte_di6xmk.jpg"
  },

  "gintama": {
    "name": "Gintama",
    "idLatino": null,
    "idJapones": null,
    "imgUrl": "https://res.cloudinary.com/dj5v7zdxp/image/upload/v1748389020/Gintama_l1sb4u.jpg"
  },

  "clannad": {
    "name": "Clannad",
    "idLatino": null,
    "idJapones": null,
    "imgUrl": "https://res.cloudinary.com/dj5v7zdxp/image/upload/v1748391271/clannad_gkw2kh.jpg"
  },

  "naruto": {
    "name": "Naruto",
    "idLatino": null,
    "idJapones": null,
    "imgUrl": "https://res.cloudinary.com/dj5v7zdxp/image/upload/v1748377137/MV5BZTNjOWI0ZTAtOGY1OS00ZGU0LWEyOWYtMjhkYjdlYmVjMDk2XkEyXkFqcGc_._V1_FMjpg_UX1000__ryemcd.jpg"
  },

  "narutoshippuden": {
    "name": "Naruto Shippuden",
    "idLatino": null,
    "idJapones": null,
    "imgUrl": "https://res.cloudinary.com/dj5v7zdxp/image/upload/v1748391276/Naruto_Shippuden_gxgmsr.jpg"
  },

  "dragonball": {
    "name": "Dragon Ball",
    "idLatino": null,
    "idJapones": null,
    "imgUrl": "https://res.cloudinary.com/dj5v7zdxp/image/upload/v1748391276/dragonball_ffqbri.jpg"
  },

  "dragonballz": {
    "name": "Dragon Ball Z",
    "idLatino": null,
    "idJapones": null,
    "imgUrl": "https://res.cloudinary.com/dj5v7zdxp/image/upload/v1748377149/Dragon-Ball-Z_d59l8e.webp"
  }
};
