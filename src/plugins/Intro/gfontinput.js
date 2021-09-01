(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define([], factory);
    } else if (typeof module === 'object' && module.exports) {
        module.exports = factory();
    } else {
        root.returnExports = factory();
  }
}(typeof self !== 'undefined' ? self : this, function () {

  gFontInput = {
    fonts: "Roboto,Open Sans,Noto Sans JP,Lato,Montserrat,Source Sans Pro,Roboto Condensed,Oswald,Poppins,Roboto Mono,Noto Sans,Raleway,PT Sans,Roboto Slab,Merriweather,Ubuntu,Playfair Display,Nunito,Noto Sans KR,Rubik,Lora,Noto Sans TC,PT Serif,Nunito Sans,Work Sans,Noto Serif,Hind Siliguri,Fira Sans,Nanum Gothic,Mukta,Quicksand,Titillium Web,Inter,Karla,Inconsolata,Barlow,Oxygen,Heebo,PT Sans Narrow,Source Code Pro,Josefin Sans,Dosis,Arimo,Libre Franklin,Maven Pro,Cabin,Libre Baskerville,Anton,Noto Sans SC,Bitter,Hind,Lobster,IBM Plex Sans,Crimson Text,Archivo Narrow,Abel,Source Serif Pro,Dancing Script,Bebas Neue,Yanone Kaffeesatz,Cairo,Fjalla One,Noto Sans HK,Barlow Condensed,Varela Round,Zilla Slab,Comfortaa,Antic Slab,Indie Flower,Arvo,Architects Daughter,Pacifico,Exo 2,DM Sans,EB Garamond,Merriweather Sans,Shadows Into Light,Questrial,Prompt,Asap,Teko,Kanit,Balsamiq Sans,Mulish,Overpass,Exo,Abril Fatface,Assistant,Rajdhani,Slabo 27px,Cormorant Garamond,Acme,Martel,Fredoka One,Fira Sans Condensed,Catamaran,Hind Madurai,Caveat,IBM Plex Serif,Signika,Play,Amatic SC,Bree Serif,Domine,Permanent Marker,Tajawal,Noto Serif JP,Nanum Myeongjo,Patrick Hand,Barlow Semi Condensed,Satisfy,Alfa Slab One,ABeeZee,Righteous,PT Sans Caption,Padauk,Patua One,Amiri,Crete Round,Archivo,Vollkorn,Cinzel,Courgette,Frank Ruhl Libre,Bangers,Staatliches,Alegreya,Alegreya Sans,Ubuntu Condensed,Manrope,Spartan,M PLUS Rounded 1c,M PLUS 1p,Tinos,Kaushan Script,Lobster Two,Great Vibes,Archivo Black,Francois One,Cantarell,IBM Plex Mono,Almarai,Yantramanav,Cardo,Kalam,Russo One,Noticia Text,Parisienne,News Cycle,Didact Gothic,Sacramento,Baloo 2,Pathway Gothic One,Cuprum,Gothic A1,Changa,Orbitron,Red Hat Display,Sarabun,Gloria Hallelujah,Prata,Passion One,Chivo,Encode Sans,Concert One,Rokkitt,Quattrocento Sans,Secular One,Old Standard TT,Ramabhadra,Montserrat Alternates,Public Sans,Hind Vadodara,Squada One,Josefin Slab,Monda,Hind Guntur,Merienda,Press Start 2P,Paytone One,Volkhov,Quattrocento,Handlee,Playfair Display SC,Ropa Sans,Sanchez,Luckiest Guy,Vidaloka,Istok Web,Ultra,Yellowtail,Cookie,Poiret One,Philosopher,Arapey,Cormorant,Advent Pro,Sawarabi Mincho,Spectral,Neuton,Economica,Special Elite,Saira Condensed,Jost,Faustina,Chakra Petch,DM Serif Display,Saira Semi Condensed,Sigmar One,Khand,DM Serif Text,Saira,Rock Salt,Unica One,Encode Sans Condensed,Hammersmith One,Fira Sans Extra Condensed,Taviraj,Jura,Pragati Narrow,Mitr,Neucha,Karma,Homemade Apple,Alice,Cabin Condensed,Ruda,Gudea,Asap Condensed,Noto Serif TC,PT Mono,Marck Script,Jaldi,Gentium Basic,BenchNine,Monoton,Actor,Pontano Sans,El Messiri,Space Mono,Electrolize,Bad Script,Kameron,Tangerine,Bai Jamjuree,Allura,Adamina,Varela,Amaranth,Carter One,Khula,Damion,Lusitana,Berkshire Swash,Armata,Nothing You Could Do,Julius Sans One,Audiowide,Palanquin,Quantico,Bungee,Nanum Pen Script,Gentium Book Basic,Lateef,Viga,Sawarabi Gothic,Mali,Alef,Playball,Aleo,Markazi Text,Ubuntu Mono,Tenor Sans,Unna,Fugaz One,Noto Serif SC,Scheherazade,Yeseva One,Aclonica,Shadows Into Light Two,Mr Dafoe,Sorts Mill Goudy,Signika Negative,Nanum Gothic Coding,Gochi Hand,Suez One,Abhaya Libre,Coda,Six Caps,Syncopate,Alex Brush,Allan,Gelasio,Rufina,Sarala,Marcellus,Cantata One,Averia Serif Libre,Eczar,Arsenal,Antic,Miriam Libre,Sriracha,Cutive Mono,Alata,Krub,Do Hyeon,Basic,Noto Serif KR,Bowlby One SC,PT Serif Caption,Arima Madurai,Chewy,Cousine,Kosugi Maru,Lilita One,Laila,Fira Mono,Overlock,Pinyon Script,Sintony,Alegreya Sans SC,Pridi,Rancho,Gruppo,Courier Prime,Spinnaker,Oleo Script,Enriqueta,Annie Use Your Telescope,Itim,Glegoo,Niconne,Blinker,Mallanna,Fredericka the Great,Average,Black Han Sans,Capriola,Covered By Your Grace,Reem Kufi,Baloo Chettan 2,Black Ops One,Saira Extra Condensed,Lexend Deca,Kreon,Boogaloo,Reenie Beanie,Mada,Yrsa,Candal,Schoolbell,Michroma,Kadwa,Martel Sans,Caveat Brush,Krona One,Rambla,Oranienbaum,Knewave,Mukta Malar,Allerta,Voltaire,Anonymous Pro,Arbutus Slab,Lalezar,Norican,Italianno,Titan One,Lemonada,Forum,Days One,Cabin Sketch,Shrikhand,Aldrich,Nixie One,Ranchers,Bevan,Rubik Mono One,Crimson Pro,Share Tech Mono,Sansita,Sen,Caudex,Gilda Display,Yesteryear,Red Hat Text,Just Another Hand,Trirong,VT323,Holtwood One SC,Changa One,Bentham,Molengo,Telex,Coming Soon,Nobile,Leckerli One,Londrina Solid,Thasadith,Pangolin,Mrs Saint Delafield,Creepster,Mukta Vaani,Overpass Mono,Judson,Scada,Literata,Bubblegum Sans,Bungee Inline,Racing Sans One,Allerta Stencil,Cinzel Decorative,Pattaya,Share,Sofia,Alegreya SC,Sniglet,Herr Von Muellerhoff,Rochester,GFS Didot,Arizonia,Seaweed Script,Charm,Harmattan,Graduate,Delius,Calligraffitti,Biryani,Marcellus SC,Average Sans,Rozha One,Amita,Suranna,Niramit,Fauna One,Lustria,Rye,IBM Plex Sans Condensed,Contrail One,Kristi,Amiko,Carrois Gothic,Magra,Trocchi,Averia Libre,Rosario,Grand Hotel,Halant,Kelly Slab,Palanquin Dark,Carme,Hanuman,Belleza,Nanum Brush Script,Ovo,Copse,Coustard,Darker Grotesque,Metrophobic,Chango,Cedarville Cursive,Baloo Tamma 2,IM Fell Double Pica,Cambay,Wallpoet,Kurale,Marmelad,Jockey One,Love Ya Like A Sister,Merienda One,Aladin,Slabo 13px,Epilogue,Amethysta,Baloo Da 2,Corben,Athiti,Poly,Battambang,Petit Formal Script,Big Shoulders Display,Syne,La Belle Aurore,Mr De Haviland,Maitree,Alatsi,Comic Neue,Duru Sans,Mirza,Sunflower,Jua,Chelsea Market,Baskervville,Coda Caption,Cormorant Infant,Antic Didone,Oxygen Mono,Radley,Cutive,Goudy Bookletter 1911,ZCOOL XiaoWei,K2D,Rammetto One,Marvel,Andada,Monsieur La Doulaise,UnifrakturMaguntia,Gravitas One,Esteban,Kosugi,Buenard,Lekton,Inder,Libre Caslon Text,Alike,Frijole,Emilys Candy,Manjari,Chonburi,Gugi,Lemon,Balthazar,Homenaje,Turret Road,Gabriela,Sue Ellen Francisco,Podkova,Chau Philomene One,Mate,Rouge Script,IM Fell English,Mandali,Megrim,Waiting for the Sunrise,Montaga,Grandstander,Pompiere,Short Stack,Tenali Ramakrishna,Convergence,Quando,Baumans,Spectral SC,Cormorant SC,Sora,Stardos Stencil,Limelight,B612,Bowlby One,Freckle Face,Ceviche One,Happy Monkey,Bellefair,Skranji,Finger Paint,Fanwood Text,Gurajada,Dawning of a New Day,Metamorphous,Montez,Oleo Script Swash Caps,Qwigley,McLaren,Doppio One,Numans,Mountains of Christmas,Vast Shadow,Andika,Libre Barcode 39,Sail,Sedgwick Ave,Grenze Gotisch,Belgrano,Oregano,David Libre,Caladea,Katibeh,Fira Code,Zeyada,Bungee Shade,Patrick Hand SC,Expletus Sans,B612 Mono,Recursive,Wendy One,Encode Sans Semi Condensed,Give You Glory,Brawler,Yusei Magic,Rakkas,Anaheim,Ma Shan Zheng,Mouse Memoirs,Fondamento,Proza Libre,Clicker Script,Cambo,Meddon,Raleway Dots,Hepta Slab,Be Vietnam,Crafty Girls,Aguafina Script,Baloo Thambi 2,Orienta,Vesper Libre,Bilbo Swash Caps,Encode Sans Expanded,Rasa,BioRhyme,Unkempt,Atma,Over the Rainbow,Gaegu,Mansalva,Meera Inimai,Strait,Tauri,Sarpanch,Galada,Nokora,Faster One,NTR,Aref Ruqaa,Henny Penny,Artifika,Ledger,Pavanam,Nova Mono,Federo,Hi Melody,Euphoria Script,Inknut Antiqua,Timmana,Geo,Tillana,Fontdiner Swanky,Shojumaru,Loved by the King,Commissioner,IM Fell DW Pica,Cherry Cream Soda,Prosto One,Vollkorn SC,Carrois Gothic SC,Share Tech,Sumana,Walter Turncoat,Iceland,Averia Sans Libre,Life Savers,Syne Mono,Tienne,Livvic,Red Rose,Della Respira,Space Grotesk,Salsa,Alike Angular,Delius Swash Caps,Dokdo,Montserrat Subrayada,Notable,Mako,Big Shoulders Text,Cormorant Unicase,DM Mono,Gafata,Scope One,Major Mono Display,Koulen,Fresca,Imprima,Flamenco,Calistoga,Coiny,Asul,Mina,Codystar,Denk One,Bilbo,Lexend,JetBrains Mono,Bubbler One,Mukta Mahee,Nova Square,Englebert,Voces,Manuale,Lily Script One,IM Fell English SC,UnifrakturCook,Slackey,ZCOOL QingKe HuangYou,The Girl Next Door,Arya,Cormorant Upright,Trade Winds,Headland One,Cantora One,Medula One,Kumbh Sans,Almendra,Port Lligat Slab,Ramaraja,Puritan,Vampiro One,Moul,Peralta,Amarante,Ribeye,Fjord One,Cherry Swash,Ruslan Display,Port Lligat Sans,Dynalight,Nova Round,Italiana,Milonga,Just Me Again Down Here,Spicy Rice,Vibur,Oxanium,New Rocker,Engagement,Goldman,Ranga,Text Me One,Lexend Zetta,Germania One,Macondo Swash Caps,Sura,Baloo Bhaina 2,Paprika,Elsie,Eater,Fascinate,Yatra One,Kite One,Averia Gruesa Libre,Julee,Stalemate,Overlock SC,Swanky and Moo Moo,Modak,Kranky,Sancreek,Wire One,League Script,Redressed,Encode Sans Semi Expanded,Habibi,Nova Flat,Mate SC,Bigelow Rules,Delius Unicase,IM Fell French Canon SC,Baloo Tammudu 2,Jomhuria,Farro,Pirata One,Baloo Bhai 2,Quintessential,Baloo Paaji 2,Kodchasan,Crushed,Shanti,Galdeano,Lakki Reddy,Sarina,Mystery Quest,Song Myung,Khmer,Libre Barcode 39 Text,Angkor,Saira Stencil One,Bellota Text,Barrio,Uncial Antiqua,Seymour One,Lovers Quarrel,Rosarivo,MuseoModerno,Nosifer,IM Fell French Canon,Hanalei Fill,Mogra,Kotta One,Petrona,Bodoni Moda,Poller One,Simonetta,Gamja Flower,Stoke,Chilanka,Ruluko,Prociono,Dekko,Rationale,Srisakdi,Chicle,Fahkwang,Libre Barcode 39 Extended Text,Spirax,Gayathri,Tomorrow,Kumar One,Bellota,Donegal One,Fenix,Solway,Zilla Slab Highlight,Flavors,Akronim,KoHo,Elsie Swash Caps,Margarine,Sonsie One,Ribeye Marrow,Inria Serif,Tulpen One,Buda,Metal,Marko One,Charmonman,Stint Ultra Expanded,East Sea Dokdo,Stint Ultra Condensed,Asar,Bayon,Cagliostro,Eagle Lake,Meie Script,Ibarra Real Nova,Newsreader,Libre Caslon Display,Rum Raisin,Lexend Exa,Yeon Sung,Kavivanar,Londrina Outline,Original Surfer,Farsan,Condiment,Piazzolla,Iceberg,Junge,Dorsa,Stylish,Cute Font,IM Fell Great Primer,Joti One,Autour One,Ravi Prakash,IM Fell DW Pica SC,Jomolhari,Linden Hill,Offside,Chathura,Kavoon,Griffy,Shippori Mincho,Sree Krushnadevaraya,Kulim Park,RocknRoll One,Ruthie,Potta One,Sahitya,Keania One,Gorditas,Beth Ellen,Rowdies,Maiden Orange,Atomic Age,Modern Antiqua,Wellfleet,Glass Antiqua,Bigshot One,Jolly Lodger,Chela One,Trykker,Arbutus,Croissant One,Reggae One,Varta,Libre Barcode 128,Content,Inika,Monofett,Akaya Telivigala,Odor Mean Chey,Train One,Castoro,Sulphur Point,Rhodium Libre,Diplomata SC,Mrs Sheppards,Lancelot,Kantumruy,Bokor,Bungee Outline,Stalinist One,Piedra,DotGothic16,Gotu,Diplomata,Metal Mania,Suwannaphum,Felipa,Galindo,Miniver,Romanesco,Siemreap,Oldenburg,Devonshire,Poor Story,Sansita Swashed,Molle,Londrina Shadow,Hachi Maru Pop,MedievalSharp,Caesar Dressing,Snippet,Dela Gothic One,Jacques Francois Shadow,Sirin Stencil,Dr Sugiyama,Ewert,GFS Neohellenic,Risque,Revalia,Girassol,Princess Sofia,Barriecito,Snowburst One,Almendra SC,Libre Barcode 128 Text,Jim Nightshade,Stick,Underdog,Bahiana,Asset,Smythe,Fraunces,Gupter,Goblin One,Long Cang,Freehand,Shippori Mincho B1,Emblema One,Dangrek,Nova Slim,Kufam,Libre Barcode 39 Extended,Lexend Mega,Fascinate Inline,Plaster,Texturina,IM Fell Great Primer SC,Peddana,Mr Bedfort,Almendra Display,Irish Grover,Federant,Chenla,Brygada 1918,Sedgwick Ave Display,Jacques Francois,Lexend Giga,Big Shoulders Stencil Text,Miss Fajardose,ZCOOL KuaiLe,Taprom,Odibee Sans,Purple Purse,Zhi Mang Xing,Akaya Kanadaka,Sunshiney,Kumar One Outline,Grenze,Kiwi Maru,Macondo,Smokum,Inria Sans,Erica One,Trochut,Preahvihear,Liu Jian Mao Cao,Andika New Basic,Bonbon,Ruge Boogie,Butterfly Kids,Moulpali,Unlock,IM Fell Double Pica SC,Hanalei,Supermercado One,Kirang Haerang,Bungee Hairline,Miltonian Tattoo,Sofadi One,Astloch,Combo,Aubrey,Nerko One,Gidugu,Nova Oval,Langar,Londrina Sketch,Nova Cut,Nova Script,Butcherman,Passero One,Vibes,Black And White Picture,Imbue,Kdam Thmor,Lexend Tera,Geostar Fill,Lacquer,Miltonian,New Tegomin,Fasthand,Sevillana,Suravaram,Fruktur,Bahianita,Oi,BioRhyme Expanded,Dhurjati,Big Shoulders Inline Text,Single Day,Kenia,Geostar,Big Shoulders Stencil Display,Big Shoulders Inline Display,Lexend Peta,Warnes,Syne Tactile,Truculenta,Viaoda Libre,Trispace,Ballet,Xanh Mono,Benne,Libre Barcode EAN13 Text",
    css: `
    .gfont-input+.gfont-input-box{display:none;}
    .gfont-input.gfont-input-dropdown+.gfont-input-box{display:block;}
    .gfont-input-box { height: 10rem; position: relative; box-shadow: 0 0 1px black; font-size: 1.25rem; }
    .gfont-input-scroll { position: absolute; top: 0; left: 0; right: 0; bottom: 0; overflow: auto; }
    .gfont-input-scroll div { padding: .25rem; cursor: pointer; }
    .gfont-input-scroll div:nth-of-type(even) { background-color:#f8f8f8; }
    `,
    html:'<div class="gfont-input-box"><div class="gfont-input-scroll"></div></div>',
    cache: {},
    classname: 'gfont-input',
    el: undefined,
    container: undefined,
    head: undefined,
    focusDelay: 500,

    injectStyle: function(css) {
      var style = document.createElement('style');
      style.type = 'text/css';
      style.appendChild(document.createTextNode(css));
      this.head.appendChild(style);
    },

    loadFont: function(family) {
      if (!family || this.cache[family]) return;
      this.injectStyle('@import url("https://fonts.googleapis.com/css?display=swap&family=' + family.replace(/\s/gi,'+') + '");');
      this.cache[family] = 1;
    },

    // callback happens outside the scope of this object, so we call the gFontInput methods directly
    callback: function(entries, observer) {
      Array.prototype.forEach.call(entries, function(entry) {
        if (entry.isIntersecting) {
          window.requestIdleCallback(function(){gFontInput.loadFont(entry.target.textContent)},{timeout:100});
          entry.target.addEventListener('click', gFontInput.clickHandler);
        } else {
          entry.target.removeEventListener('click', gFontInput.clickHandler);
        }
      });
    },

    // clickHandler occurs outside the scope of this object, so we have to find the input element for this event
    clickHandler: function(event) {
      var input = event.target.closest("div.gfont-input-box").previousElementSibling;
      input.style.fontFamily = event.target.textContent;
      input.value = event.target.textContent;
      var e = new Event('change');
      input.dispatchEvent(e);
      input.classList.remove('gfont-input-dropdown');
    },

    create: function(input) {
      if(typeof input === 'string') input = document.querySelector('#'+input);
      if (!input) return;
      this.el = input;
      this.el.classList.add('gfont-input');
      this.el.insertAdjacentHTML('afterend', this.html);
      this.container = this.el.parentNode.querySelector('.gfont-input-scroll');
      this.el.addEventListener('focus', function(elm) {
          elm.target.parentNode.querySelector(".gfont-input-box").style.width = elm.target.offsetWidth;
          elm.target.classList.add('gfont-input-dropdown');
      });
      this.el.addEventListener('blur', function(elm) {
        setTimeout(function() {elm.target.classList.remove('gfont-input-dropdown')}, gFontInput.focusDelay);
      });

      this.head = document.head || document.getElementsByTagName('head')[0];
      this.injectStyle(this.css);

      this.container.innerHTML = this.fonts.split(",").map(function(v) {
        return '<div style="font-family:\''+v+'\'">'+v+'</div>';
      }).join("\n");

      var observer = new IntersectionObserver(this.callback, {
        root: this.container,
        rootMargin: '0px',
        threshold: 0.5
      });

      Array.prototype.forEach.call(this.container.querySelectorAll('div'), function(node) {
        observer.observe(node);
      });

    },
    destroy: function(input) {
      this.el.classList.remove('gfont-input');
      this.container.parentNode.removeChild(this.container);
    }
  }

  return gFontInput;
}));