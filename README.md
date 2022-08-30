# **ALSAT**

> A website where you can sell brand-new or second-hand products and bid on advertisements. Buy and sell easily.

> Sıfır veya ikinci el ürünleri satabileceğiniz, ilanlara teklif verebileceğiniz bir internet sitesi. Kolayca al ve sat.

<br>

# **Technologies and techniques used in the project (Projede kullanılan teknikler ve teknolojiler)**

### **Backend**

- **N-Tier Architecture**
- **AOP**
- **"Entity Framework"**
- **"Autofac"**
- **"Fluent Validation"**
- **"Json Web Token"**
- **"API"**
- **"LINQ"**
- **Interceptors**
- **Aspects**
- **Repository Design Pattern**
- **Unit Of Work**
- **Custom Error Middleware**
- **DTO's**
- **Authorization System**
- **Result structure in every part of the project**

### **Frontend**

- **React**
- **Tailwind CSS**
- **Context**
- **"Formik"**
- **"React Toastify"**
- **"React Icons"**
- **Google Fonts**

<br>

# **Prerequisites**

What is needed to set up the dev environment. For instance, global dependencies or any other tools. include download links.

<br>

# **Installing / Getting started (Yükleme / Projeyi çalıştırma)**

Here's a brief intro about what a developer must do in order to start developing
the project further:

```shell
git clone https://github.com/payologllc/primefor-2022-staj-mustafahincal.git
```

### **Backend**

```shell
1) Click project-server file (project-server dosyasına tıkla)
2) Click project-server.sln and open it Visual Studio (project-server.sln dosyasına tıkla ve Visual Studio'da aç)
3) Navigate to Build - Rebuild Solution
4) Navigate to Tools - Extensions and Updates
5) Click Online located on the left side and search for Open Command Line and install (restart Visual Studio)
6) Click on ContosoUniversity.API project on the Solution Explorer, and press ALT + SPACE to open up CLI
7) Run this migration command: dotnet ef migrations add InitialDatabase -c ContosoContext
8) Run another command which creates database: dotnet ef database update -c ContosoContext
9) In Startup.cs, uncomment seeder.InitializeData().Wait(); from Configure method
10) Press F5 to run the project. (Make sure ContosoUniversity.API is set as startup project)
```

### **Frontend**

```shell
1) cd project-client/
2) npm install
3) npm run start
```

And state what happens step-by-step. If there is any virtual environment, local server or database feeder needed, explain here.

<br>

# **Building**

If your project needs some additional steps for the developer to build the
project after some code changes, state them here. for example:

```shell
./configure
make
make install
```

Here again you should state what actually happens when the code above gets
executed.

<br>

# **Versioning**

We can maybe use [SemVer](http://semver.org/) for versioning. For the versions available, see the [link to tags on this repository](/tags).

<br>

# **Configuration**

Here you should write what are all of the configurations a user can enter when using the project.

<br>

# **Style guide**

Explain your code style and show how to check it.

<br>

# **Api Reference**

If the api is external, link to api documentation. If not describe your api including authentication methods as well as explaining all the endpoints with their required parameters.

<br>

# **Database (Veri Tabanı)**

Explaining what database (and version) has been used. Provide download links.
Documents your database design and schemas, relations etc...

![](screenshots-readme/database.png)

<br>

# **Licensing**

State what the license is and how to find the text version of the license.

<br>

# **Project Images (Proje Fotoğraf)**

## **_Login (Giriş Yap)_**

![](screenshots-readme/1-login.png)
![](screenshots-readme/2-login-darkmode.png)

<br>

## **_Register (Kayıt Ol)_**

![](screenshots-readme/2-register.png)

<br>

## **_Home (Anasayfa)_**

![](screenshots-readme/2-home.png)
<br>

## **_Products (Ürünler)_**

![](screenshots-readme/3-main.png)
![](screenshots-readme/4-main-dark.png)
<br>

## **_Products - When sold (Ürünler - Satıldığı zaman)_**

![](screenshots-readme/5-main-takenProduct.png)
<br>

## **_Add Product (Ürün Ekle)_**

![](screenshots-readme/6-addProduct.png)
<br>

## **_Product Details (Ürün Detayları)_**

![](screenshots-readme/7-productDetails.png)
<br>

## **_Offer For Product (Ürüne Teklif Ver)_**

![](screenshots-readme/8-offerForProduct.png)
![](screenshots-readme/9-offerForProduct-dark-offered.png)
<br>

## **_Given Offers (Verilen Teklifler)_**

![](screenshots-readme/10-givenOffers.png)
<br>

## **_Given Offers - Approved (Verilen Teklifler - Onaylanmış)_**

![](screenshots-readme/11-givenOffers-approved.png)
<br>

## **_Given Offers - Bought (Verilen Teklifler - Satın Alınmış)_**

![](screenshots-readme/12-givenoffers-bought.png)
<br>

## **_Taken Offers (Alınan Teklifler)_**

![](screenshots-readme/13-takenOffers.png)
<br>

## **_Taken Offers - Approved (Alınan Teklifler - Onaylanmış)_**

![](screenshots-readme/14-takenOffers-approved.png)
<br>

## **_Taken Offers - Bought (Alınan Teklifler - Satın Alınmış)_**

![](screenshots-readme/15-takenOffers-bought.png)
<br>

## **_Purchased Products (Satın Alınan Ürünler)_**

![](screenshots-readme/16-purchasedProducts.png)
<br>

## **_Solded Products (Satılan Ürünler)_**

![](screenshots-readme/18-soldedProductss.png)
<br>

## **_Profile Dropdown (Profil Açılır Liste)_**

![](screenshots-readme/17-soldedProducts-drowdown.png)
<br>

## **_Profile (Hesabım)_**

![](screenshots-readme/22-profile.png)
<br>

## **_Credit Card (Kredi Kartı)_**

![](screenshots-readme/23-creditCard.png)
<br>

## **_Update User (Kullanıcıyı Güncelle)_**

![](screenshots-readme/24-changeUserDetails.png)
<br>

## **_Change Password (Şifre Değiştir)_**

![](screenshots-readme/25-changePassword.png)
<br>

## **_Payment (Ödeme)_**

![](screenshots-readme/19-payment.png)
<br>

## **_Payment - Save Credit Card (Ödeme - Kredi Kartını Kaydet)_**

![](screenshots-readme/20-payment-saveCreditCard.png)
<br>

## **_Payment - Saved Credit Card (Ödeme - Kayıtlı Kredi Kartı)_**

![](screenshots-readme/21-payment-savedCard.png)
<br>

## **_Dashboard - Products (Kontrol Paneli - Ürünler)_**

![](screenshots-readme/26-dashboard-products.png)
<br>

## **_Dashboard - Categories (Kontrol Paneli - Kategoriler)_**

![](screenshots-readme/27-dashboard-categories.png)
<br>

## **_Dashboard - Brands (Kontrol Paneli - Markalar)_**

![](screenshots-readme/28-dashboard-brands.png)
<br>

## **_Dashboard - Colors (Kontrol Paneli - Renkler)_**

![](screenshots-readme/29-dashboard-colors.png)
<br>

## **_Dashboard - Using States (Kontrol Paneli - Kullanım Durumları)_**

![](screenshots-readme/27-dashboard-usingStates.png)
<br>

## **_Dashboard - Users (Kontrol Paneli - Kullanıcılar)_**

![](screenshots-readme/30-dashboard-users.png)
<br>

## **_Dashboard - Credit Cards (Kontrol Paneli - Kredi Kartları)_**

![](screenshots-readme/31-dashboard-creditcards.png)
