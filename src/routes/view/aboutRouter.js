"use strict";
/* -------------------------------------------------------
    | FULLSTACK TEAM | NODEJS / EXPRESS |
------------------------------------------------------- */
const router = require("express").Router();

router.get("/", (req, res) => {
  const pageData = {
    title: "Hakkımızda - My Blog",
    pageTitle: "Hakkımızda",
    aboutContent: {
      paragraph1:
        "My Blog'a hoş geldiniz! Teknoloji, yaşam tarzı ve kişisel gelişim gibi çeşitli konularda kaliteli içerik paylaşma konusunda tutkulu bir ekibiz. Amacımız, okuyucularımıza değerli bilgiler ve içgörüler sağlamaktır. Daha heyecan verici gönderiler ve güncellemeler için bizi takipte kalın!",
      paragraph2:
        "Ekibimiz, zamanlarını ilgi çekici ve bilgilendirici içerikler oluşturmaya adayan deneyimli yazarlar ve meraklılardan oluşmaktadır. Herhangi bir sorunuz veya öneriniz varsa, lütfen bizimle iletişime geçmekten çekinmeyin.",
    },
  };

  res.render("about", pageData);
});

module.exports = router;
