function Footer() {
  return (
    <div className="flex flex-row justify-between items-center py-6 px-12 sm:px-10 md:px-16 lg:px-24 xl:px-32 bg-gray-800 text-white  border-gray-300 ">
      <div className="flex flex-col sm:flex-row sm:justify-between gap-3 text-sm">
        <p className="font-bold">Resmi bağlantılar</p>
        <p>Şartlar ve Koşullar</p>
        <p>Reklam Politikası</p>
        <p>Resmi Kurumlar için Kılavuz</p>
        <p>Gizlilik Bildirimi</p>
      </div>
      <div className="flex flex-col sm:flex-row sm:justify-between gap-3">
        <p>Türkiye'de ikinci el eşya al ve sat</p>
        <p>© 2022 - 2023 ALSAT</p>
      </div>
    </div>
  );
}

export default Footer;
