/**
 * Isso garante que todo o código JavaScript só vai rodar DEPOIS
 * que a página HTML inteira for carregada. É uma boa prática para
 * evitar erros de "elemento não encontrado".
 */
document.addEventListener('DOMContentLoaded', () => {

    // =========================================================================
    // 1. DICIONÁRIO DE TRADUÇÕES
    // =========================================================================
    /**
     * Este objeto gigante é o nosso "dicionário".
     * Ele guarda todos os textos do site em Português ('pt') e Inglês ('en').
     */
    const translations = {
        'pt': {
            // Sidebar (Menu Lateral)
            navHome: "Início",
            navLibrary: "Sua Biblioteca",
            navPlaylistTitle: "Crie sua Primeira Playlist",
            navPlaylistText: "é fácil, vamos te ajudar",
            navPlaylistButton: "Criar Playlist",
            navPodcastTitle: "Que tal seguir um podcast?",
            navPodcastText: "Avisaremos você sobre nossos episódios",
            navPodcastButton: "Explorar Podcasts",
            navFooterLegal: "Legal",
            navFooterPrivacyCenter: "Centro de Privacidade",
            navFooterPrivacyPolicy: "Política de Privacidade",
            navFooterCookies: "Cookies",
            navFooterAds: "Sobre Anúncios",
            navFooterAccessibility: "Acessibilidade",
            navLangButton: "Português do Brasil",
            // Main (Conteúdo Principal)
            searchPlaceholder: "O que você quer ouvir?",
            artistsTitle: "Artistas Populares",
            albumsTitle: "Álbuns Populares",
            cardArtistText: "Artista",
            cardAddSongTitle: "Adicionar música a este álbum",
            cardAddAlbumTitle: "Adicionar novo álbum",
            cardAddArtistTitle: "Adicionar novo artista",
            // Seção de Busca 
            searchTitleSongs: "Músicas",
            searchTitleArtists: "Artistas",
            searchNoResults: "Nenhum resultado encontrado para",
            // Player (Barra de música)
            playerDefaultTitle: "Nenhuma música tocando",
            playerErrorPrefix: "Nenhuma música de",
            playerErrorSuffix: "encontrada.",
            playerShuffleTitle: "Aleatório",
            playerRepeatTitle: "Repetir",
            // Modais (Pop-ups de formulário)
            musicModalTitleDefault: "Adicionar Nova Música",
            musicModalTitleAlbum: "Adicionar música ao",
            labelMusicName: "Nome da Música:",
            labelMusicAudio: "Arquivo de Áudio:",
            labelMusicArtist: "Nome do Artista:",
            labelMusicImage: "URL da Imagem (ex: ./img/capa.jpg):",
            musicSubmit: "Salvar Música",
            albumModalTitle: "Adicionar Novo Álbum",
            labelAlbumName: "Nome do Álbum:",
            labelAlbumArtist: "Nome do Artista:",
            labelAlbumImage: "Imagem do Álbum:",
            albumSubmit: "Salvar Álbum",
            artistModalTitle: "Adicionar Novo Artista",
            labelArtistName: "Nome do Artista:",
            labelArtistImage: "Imagem do Artista:",
            artistSubmit: "Salvar Artista",
            playlistModalTitle: "Criar nova playlist",
            labelPlaylistName: "Nome da Playlist:",
            labelPlaylistSongs: "Selecione as músicas:",
            playlistSubmit: "Salvar Playlist",
            // Alertas / Notificações "Toast"
            alertNoAudio: "Por favor, selecione um arquivo de áudio.",
            alertNoImage: "Por favor, selecione um arquivo de imagem.",
            alertSongSuccess: "Música adicionada com sucesso!",
            alertAlbumSuccess: "Álbum adicionado com sucesso!",
            alertArtistSuccess: "Artista adicionado com sucesso!",
            alertPlaylistSuccess: "Playlist criada com sucesso!"
        },
        'en': {
            // Pacote de idioma Inglês (mesma estrutura, textos traduzidos)
            navHome: "Home",
            navLibrary: "Your Library",
            navPlaylistTitle: "Create your first playlist",
            navPlaylistText: "It's easy, we'll help you",
            navPlaylistButton: "Create Playlist",
            navPodcastTitle: "How about following a podcast?",
            navPodcastText: "We'll notify you of new episodes",
            navPodcastButton: "Explore Podcasts",
            navFooterLegal: "Legal",
            navFooterPrivacyCenter: "Privacy Center",
            navFooterPrivacyPolicy: "Privacy Policy",
            navFooterCookies: "Cookies",
            navFooterAds: "About Ads",
            navFooterAccessibility: "Accessibility",
            navLangButton: "English (US)",
            searchPlaceholder: "What do you want to listen to?",
            artistsTitle: "Popular Artists",
            albumsTitle: "Popular Albums",
            cardArtistText: "Artist",
            cardAddSongTitle: "Add song to this album",
            cardAddAlbumTitle: "Add new album",
            cardAddArtistTitle: "Add new artist",
            searchTitleSongs: "Songs", 
            searchTitleArtists: "Artists",
            searchNoResults: "No results found for",
            playerDefaultTitle: "No song playing",
            playerErrorPrefix: "No songs found for",
            playerErrorSuffix: ".",
            playerShuffleTitle: "Shuffle",
            playerRepeatTitle: "Repeat",
            musicModalTitleDefault: "Add New Song",
            musicModalTitleAlbum: "Add song to",
            labelMusicName: "Song Name:",
            labelMusicAudio: "Audio File:",
            labelMusicArtist: "Artist Name:",
            labelMusicImage: "Image URL (e.g., ./img/cover.jpg):",
            musicSubmit: "Save Song",
            albumModalTitle: "Add New Album",
            labelAlbumName: "Album Name:",
            labelAlbumArtist: "Artist Name:",
            labelAlbumImage: "Album Image:",
            albumSubmit: "Save Album",
            artistModalTitle: "Add New Artist",
            labelArtistName: "Artist Name:",
            labelArtistImage: "Artist Image:",
            artistSubmit: "Save Artist",
            playlistModalTitle: "Create new playlist",
            labelPlaylistName: "Playlist Name:",
            labelPlaylistSongs: "Select songs:",
            playlistSubmit: "Save Playlist",
            alertNoAudio: "Please select an audio file.",
            alertNoImage: "Please select an image file.",
            alertSongSuccess: "Song added successfully!",
            alertAlbumSuccess: "Album added successfully!",
            alertArtistSuccess: "Artist added successfully!",
            alertPlaylistSuccess: "Playlist created successfully!"
        }
    };


    // =========================================================================
    // 2. ESTADO GLOBAL DA APLICAÇÃO
    // =========================================================================
    /**
     * Variáveis "let" que guardam informações que mudam
     * enquanto o usuário usa o site.
     */
    
    let currentLang = 'pt'; 
    let playlistsData = []; 
    let repeatMode = 0;
    let isShuffle = false;


    // =========================================================================
    // 3. DADOS (NOSSO "BANCO DE DADOS" DE MENTIRA)
    // =========================================================================
    /**
     * Estes são os dados iniciais do nosso site.
     * Quando o usuário adiciona uma música, álbum ou artista,
     * o novo item é adicionado (com .push()) nestes arrays.
     */
    
    const artistsData = [
        { name: '50 Cent', image: './img/50cent-artista.jfif' },
        { name: 'Veigh', image: './img/veigh-artista.jfif' },
        { name: 'Thalles Roberto', image: './img/thalles-artista.jfif' },
        { name: 'Grupo Menos É Mais', image: './img/artista-menosemais.jfif' },
        { name: 'Drake', image: './img/drake-artista.jfif' },
        { name: 'Zé Neto', image: './img/artista-ze-neto.jpg' },
        { name: 'BK', image: './img/bk-artista.jfif' }
    ];

    const albumsData = [
        { name: 'SVANTH', artist: 'Kyan', image: './img/album-kyan.jfif' },
        { name: 'Eu Tenho Um Deus', artist: 'Thalles Roberto', image: './img/album-thalles.jfif' },
        { name: 'Blonde', artist: 'Frank Ocean', image: './img/album-frankocean.jpg' },
        { name: 'Autodomínio', artist: 'pumapjl', image: './img/puma-album.jfif' },
        { name: 'Nada como um Dia após o Outro Dia', artist: 'Racionais MC', image: './img/album-racionais.jpg' }
    ];

    const musicsData = [
        { name: 'Arde Outra Vez', artist: 'Thalles Roberto', audio: './msc/Arde Outra Vez.mp3', image: './img/album-thalles.jfif', duration: "4:05" },
        { name: 'Window Shopper', artist: '50 Cent', audio: './msc/Window Shopper.mp3', image: './img/50cent-artista.jfif', duration: "3:10" },
        { name: 'White Ferrari', artist: 'Frank Ocean', audio: './msc/White Ferrari.mp3', image: './img/album-frankocean.jpg', duration: "4:08" },
        { name: 'Solta minha Blusa', artist: 'pumapjl', audio: './msc/Solta minha Blusa.mp3', image: './img/puma-album.jfif', duration: "2:45" },
        { name: 'Negro Drama', artist: 'Racionais MC', audio: './msc/Negro Drama.mp3', image: './img/album-racionais.jpg', duration: "6:51" },
        { name: 'P do Pecado', artist: 'Grupo Menos É Mais', audio: './msc/P do Pecado.mp3', image: './img/artista-menosemais.jfif', duration: "3:15" },
        { name: 'Mil Maneiras', artist: 'Veigh', audio: './msc/Mil Maneiras.mp3', image: './img/veigh-artista.jfif', duration: "2:50" },
        { name: 'Gods plan', artist: 'Drake', audio: './msc/Gods plans.mp3', image: './img/drake-artista.jfif', duration: "3:18" },
        { name: 'Barulho do Foguete', artist: 'Zé Neto', audio: './msc/Barulho do Foguete.mp3', image: './img/artista-ze-neto.jpg', duration: "2:55" },
        { name: 'Continuação de um Sonho', artist: 'BK', audio: './msc/Continuacao.mp3', image: './img/bk-artista.jfif', duration: "3:30" },
        { name: 'CONSTRUA SEUS SONHOS', artist: 'Kyan', audio: './msc/Construa seus sonhos.mp3', image: './img/album-kyan.jfif', duration: "2:30" },
        { name: 'In Da Club', artist: '50 Cent', audio: './msc/In Da Club.mp3', image: './img/50cent-artista.jfif', duration: "3:13" }
    ];


    // =========================================================================
    // 4. REFERÊNCIAS DO DOM (Conectando o JS com o HTML)
    // =========================================================================
    /**
     * Pegamos todos os elementos do HTML que precisamos controlar
     * (clicar, ler, alterar) e guardamos em variáveis.
     */

    // --- Grids de Conteúdo (Artistas e Álbuns) ---
    const popularArtistsGrid = document.getElementById('artists-grid');
    const popularAlbumsGrid = document.getElementById('albums-grid');
    
    // --- Elementos do Player de Áudio ---
    const playerBar = document.querySelector('.player-bar');
    const audioPlayer = document.getElementById('audio-player');
    const playPauseBtn = document.getElementById('play-pause-button');
    const prevBtn = document.getElementById('prev-button');
    const nextBtn = document.getElementById('next-button');
    const shuffleButton = document.getElementById('shuffle-button');
    const repeatButton = document.getElementById('repeat-button');

    const progressContainer = document.getElementById('progress-container');
    const progressBar = document.getElementById('progress-bar');
    const timeCurrent = document.getElementById('time-current');
    const timeDuration = document.getElementById('time-duration');
    const playerSongTitle = document.getElementById('player-song-title');
    const playerSongArtist = document.getElementById('player-song-artist');
    const playerArt = document.getElementById('player-art');
    
    // --- Elementos de Volume ---
    const volumeDownBtn = document.getElementById('volume-down-button');
    const volumeUpBtn = document.getElementById('volume-up-button');
    const volumeContainer = document.getElementById('volume-container');
    const volumeBar = document.getElementById('volume-bar');

    // --- Botões de Ação e Modais (Pop-ups) ---
    const homeButton = document.getElementById('home-button');
    const addArtistBtn = document.getElementById('add-artist-btn');
    const addAlbumBtn = document.getElementById('add-album-btn');
    const createPlaylistBtn = document.getElementById('create-playlist-btn');
    
    const musicModal = document.getElementById('music-modal');
    const albumModal = document.getElementById('album-modal');
    const artistModal = document.getElementById('artist-modal');
    const playlistModal = document.getElementById('playlist-modal');

    const musicModalClose = document.getElementById('music-modal-close');
    const albumModalClose = document.getElementById('album-modal-close');
    const artistModalClose = document.getElementById('artist-modal-close');
    const playlistModalClose = document.getElementById('playlist-modal-close');
    
    const musicForm = document.getElementById('music-form');
    const albumForm = document.getElementById('album-form');
    const artistForm = document.getElementById('artist-form');
    const playlistForm = document.getElementById('playlist-form');

    const musicModalTitle = document.getElementById('music-modal-title');
    const musicArtistGroup = document.getElementById('music-artist-group');
    const musicImageGroup = document.getElementById('music-image-group');

    // --- Listas Dinâmicas ---
    const playlistSongList = document.getElementById('playlist-song-list');
    const userPlaylistsList = document.getElementById('user-playlists-list');

    // --- Elementos de Busca (AJUSTADOS PARA A NOVA ESTRUTURA) ---
    const searchBar = document.getElementById('search-bar');
    const defaultContent = document.getElementById('default-content'); // O contêiner dos Populares
    const searchResultsContainer = document.getElementById('search-results-container'); // O contêiner da Busca
    
    // Pegamos as SEÇÕES e GRIDS de busca separados (do HTML novo)
    const searchResultsSongsSection = document.getElementById('search-results-songs-section');
    const searchResultsArtistsSection = document.getElementById('search-results-artists-section');
    const searchSongsGrid = document.getElementById('search-songs-grid');
    const searchArtistsGrid = document.getElementById('search-artists-grid');

    const searchNoResults = document.getElementById('search-no-results');
    const searchNoResultsMessage = document.getElementById('search-no-results-message');

    // --- Elemento de Notificação "Toast" ---
    const toastNotification = document.getElementById('toast-notification');

    // --- Elementos de Texto para Tradução (Sidebar) ---
    const navHomeText = document.getElementById('nav-home-text');
    const navLibraryText = document.getElementById('nav-library-text');
    const navPlaylistTitle = document.getElementById('nav-playlist-title');
    const navPlaylistText = document.getElementById('nav-playlist-text');
    const navPlaylistButton = document.getElementById('create-playlist-btn');
    const navPodcastTitle = document.getElementById('nav-podcast-title');
    const navPodcastText = document.getElementById('nav-podcast-text');
    const navPodcastButton = document.getElementById('nav-podcast-button');
    const navFooterLegal = document.getElementById('nav-footer-legal');
    // ... (etc.)
    const navLangButton = document.querySelector('.nav-lang-button');
    const navLangText = document.getElementById('nav-lang-text');
    
    // --- Elementos de Texto para Tradução (Main) ---
    const artistsTitle = document.getElementById('artists-title');
    const albumsTitle = document.getElementById('albums-title');
    
    // Títulos das seções de busca (Músicas, Artistas)
    const searchSongsTitle = document.querySelector('#search-results-songs-section h2');
    const searchArtistsTitle = document.querySelector('#search-results-artists-section h2');

    // --- Elementos de Texto para Tradução (Modais) ---
    const musicModalTitleEl = document.getElementById('music-modal-title');
    const labelMusicName = document.getElementById('label-music-name');
    const labelMusicAudio = document.getElementById('label-music-audio');
    // ... (etc.)


    // =========================================================================
    // 5. ESTADO INICIAL DO PLAYER
    // =========================================================================
    
    let currentVolume = 0.5;
    audioPlayer.volume = currentVolume;
    volumeBar.style.width = `${currentVolume * 100}%`;
    let currentPlaylist = []; 
    let currentSongIndex = 0; 

    
    // =========================================================================
    // 6. LÓGICA DE MUDANÇA DE IDIOMA
    // =========================================================================

    /**
     * Função: updateLanguage
     * Objetivo: Atualiza todo o texto da página para o idioma escolhido.
     * @param {string} lang - 'pt' ou 'en'.
     */
    function updateLanguage(lang) {
        // 1. Pega o "pacote" de traduções correto (ex: translations['pt']).
        const t = translations[lang];

        // 2. Atualiza todos os textos (Sidebar, Main, Modais, etc.)
        navHomeText.innerText = t.navHome;
        navLibraryText.innerText = t.navLibrary;
        navPlaylistTitle.innerText = t.navPlaylistTitle;
        navPlaylistText.innerText = t.navPlaylistText;
        navPlaylistButton.innerText = t.navPlaylistButton;
        navPodcastTitle.innerText = t.navPodcastTitle;
        navPodcastText.innerText = t.navPodcastText;
        navPodcastButton.innerText = t.navPodcastButton;
        navFooterLegal.innerText = t.navFooterLegal;
        // ... (todos os outros textos da sidebar)
        navLangText.innerText = t.navLangButton;
        
        searchBar.placeholder = t.searchPlaceholder;
        artistsTitle.innerText = t.artistsTitle;
        albumsTitle.innerText = t.albumsTitle;
        
        // Atualiza os títulos das seções de busca
        searchSongsTitle.innerText = t.searchTitleSongs;
        searchArtistsTitle.innerText = t.searchTitleArtists;
        
        // Atualiza os 'titles' (dicas do mouse)
        addAlbumBtn.title = t.cardAddAlbumTitle;
        addArtistBtn.title = t.cardAddArtistTitle;
        shuffleButton.title = t.playerShuffleTitle;
        repeatButton.title = t.playerRepeatTitle;

        if (playerSongTitle.textContent === translations['pt'].playerDefaultTitle || 
            playerSongTitle.textContent === translations['en'].playerDefaultTitle) {
            playerSongTitle.textContent = t.playerDefaultTitle;
        }
        
        // ... (Atualização de todos os outros textos de modais)

        // 3. "Redesenha" os cards e playlists na tela.
        renderArtists();
        renderAlbums();
        renderPlaylists();
        
        // Se o usuário estiver no meio de uma busca, atualiza os resultados
        if (searchBar.value.length > 0) {
            handleSearch({ target: { value: searchBar.value } });
        }
    }

    // "Ouvinte" de clique no botão de idioma.
    navLangButton.addEventListener('click', () => {
        currentLang = (currentLang === 'pt') ? 'en' : 'pt';
        updateLanguage(currentLang);
    });

    
    // =========================================================================
    // 7. FUNÇÕES DE CONTROLE DO PLAYER
    // =========================================================================

    /**
     * Função: formatTime
     * Objetivo: Converte segundos (ex: 125) para "minutos:segundos" (ex: "2:05").
     */
    function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = Math.floor(seconds % 60);
        return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
    }

    /**
     * Função: playSong
     * Objetivo: Toca uma música específica e atualiza a interface do player.
     */
    function playSong(song) {
        if (!song) { return; } // Segurança
        
        audioPlayer.src = song.audio;
        audioPlayer.play();
        playerSongTitle.textContent = song.name;
        playerSongArtist.textContent = song.artist;
        playerArt.src = song.image;
        playerArt.style.display = 'block';
        playerBar.style.display = 'grid'; 
    }
    
    /**
     * Função: playRandomSong
     * Objetivo: Toca uma música aleatória da 'currentPlaylist'.
     */
    function playRandomSong() {
        if (currentPlaylist.length === 1) {
            playSong(currentPlaylist[0]); 
            return;
        }
        let newIndex = Math.floor(Math.random() * currentPlaylist.length);
        while (newIndex === currentSongIndex) {
            newIndex = Math.floor(Math.random() * currentPlaylist.length);
        }
        currentSongIndex = newIndex; 
        playSong(currentPlaylist[currentSongIndex]);
    }

    /**
     * Função: nextSong
     * Objetivo: Pula para a próxima música (respeitando o 'Shuffle').
     */
    function nextSong() {
        if (isShuffle) {
            playRandomSong();
        } else {
            currentSongIndex++;
            if (currentSongIndex >= currentPlaylist.length) {
                currentSongIndex = 0; 
            }
            playSong(currentPlaylist[currentSongIndex]);
        }
    }

    /**
     * Função: prevSong
     * Objetivo: Volta para a música anterior (respeitando o 'Shuffle').
     */
    function prevSong() {
        if (isShuffle) {
            playRandomSong();
        } else {
            currentSongIndex--;
            if (currentSongIndex < 0) {
                currentSongIndex = currentPlaylist.length - 1;
            }
            playSong(currentPlaylist[currentSongIndex]);
        }
    }
    
    /**
     * Função: playArtistSong
     * Objetivo: Cria uma "fila" (currentPlaylist) com as músicas de um artista.
     */
    function playArtistSong(artistName, startSongName = null, songObject = null) {
        
        // Se for uma música avulsa (clicada na busca de músicas)
        if (songObject) {
            currentPlaylist = [songObject];
            currentSongIndex = 0;
            playSong(currentPlaylist[currentSongIndex]);
            return;
        }

        // Se for um artista (clicado no card de artista)
        currentPlaylist = musicsData.filter(song => song.artist === artistName);

        if (currentPlaylist.length > 0) {
            if (startSongName) {
                currentSongIndex = currentPlaylist.findIndex(s => s.name === startSongName);
                if (currentSongIndex === -1) { currentSongIndex = 0; }
            } else {
                currentSongIndex = 0;
            }

            if (isShuffle) {
                currentSongIndex = Math.floor(Math.random() * currentPlaylist.length);
            }
            
            playSong(currentPlaylist[currentSongIndex]);
        } else {
            // Se não encontrar músicas, mostra um erro no player
            const t = translations[currentLang];
            playerSongTitle.textContent = `${t.playerErrorPrefix} ${artistName}${t.playerErrorSuffix}`;
            playerSongArtist.textContent = "";
            playerArt.style.display = 'none'; 
            playerBar.style.display = 'grid';
        }
    }
    
    /**
     * Função: playPlaylist
     * Objetivo: Toca uma playlist específica (um array de músicas) criada pelo usuário.
     */
    function playPlaylist(playlist) {
        if (playlist.songs && playlist.songs.length > 0) {
            currentPlaylist = playlist.songs; 
            
            if (isShuffle) {
                currentSongIndex = Math.floor(Math.random() * currentPlaylist.length);
            } else {
                currentSongIndex = 0;
            }
            
            playSong(currentPlaylist[currentSongIndex]);
        }
    }

    
    // =========================================================================
    // 8. "OUVINTES" DE EVENTOS DO PLAYER
    // =========================================================================
    // (Esta seção não precisava de NENHUMA alteração)
    
    playPauseBtn.addEventListener('click', () => {
        if (audioPlayer.paused) { audioPlayer.play(); } else { audioPlayer.pause(); }
    });
    audioPlayer.addEventListener('play', () => {
        playPauseBtn.classList.add('is-playing'); 
    });
    audioPlayer.addEventListener('pause', () => {
        playPauseBtn.classList.remove('is-playing');
    });
    audioPlayer.addEventListener('loadedmetadata', () => {
        const songInDb = musicsData.find(s => s.audio === audioPlayer.src);
        if (songInDb && songInDb.duration === "?:??") {
            songInDb.duration = formatTime(audioPlayer.duration);
        }
        timeDuration.textContent = formatTime(audioPlayer.duration);
    });
    audioPlayer.addEventListener('timeupdate', () => {
        timeCurrent.textContent = formatTime(audioPlayer.currentTime);
        const progressPercent = (audioPlayer.currentTime / audioPlayer.duration) * 100;
        progressBar.style.width = `${progressPercent}%`;
    });
    progressContainer.addEventListener('click', (event) => {
        const { width } = progressContainer.getBoundingClientRect();
        const clickX = event.offsetX;
        const percent = (clickX / width);
        audioPlayer.currentTime = audioPlayer.duration * percent;
    });

    nextBtn.addEventListener('click', nextSong);
    prevBtn.addEventListener('click', prevSong);
    shuffleButton.addEventListener('click', toggleShuffle);
    repeatButton.addEventListener('click', toggleRepeat);
    audioPlayer.addEventListener('ended', handleSongEnd);

    /**
     * Função: handleSongEnd
     * Objetivo: Decide o que fazer quando uma música termina (respeitando o 'Repeat').
     */
    function handleSongEnd() {
        if (repeatMode === 2) {
            // MODO 2: Repetir Música
            audioPlayer.currentTime = 0;
            audioPlayer.play();
        } else if (repeatMode === 1) {
            // MODO 1: Repetir Playlist
            nextSong(); 
        } else {
            // MODO 0: Sem Repetição
            if (currentSongIndex < currentPlaylist.length - 1) {
                nextSong();
            } else {
                playPauseBtn.classList.remove('is-playing');
            }
        }
    }

    /**
     * Função: toggleShuffle
     * Objetivo: Liga ou desliga o modo "Aleatório" (Shuffle).
     */
    function toggleShuffle() {
        isShuffle = !isShuffle; 
        shuffleButton.classList.toggle('active', isShuffle);
    }

    /**
     * Função: toggleRepeat
     * Objetivo: Muda o modo "Repetir" entre 3 estados (0, 1, 2).
     */
    function toggleRepeat() {
        repeatMode = (repeatMode + 1) % 3; 

        if (repeatMode === 0) {
            // MODO 0: Desligado
            repeatButton.classList.remove('active');
            repeatButton.classList.remove('active-song');
        } else if (repeatMode === 1) {
            // MODO 1: Repetir Playlist
            repeatButton.classList.add('active');
            repeatButton.classList.remove('active-song');
        } else {
            // MODO 2: Repetir Música
            repeatButton.classList.add('active');
            repeatButton.classList.add('active-song');
        }
    }
    
    // =========================================================================
    // 9. "OUVINTES" DE EVENTOS DE VOLUME
    // =========================================================================

    
    volumeDownBtn.addEventListener('click', () => {
        currentVolume = Math.max(0, currentVolume - 0.1);
        audioPlayer.volume = currentVolume;
        volumeBar.style.width = `${currentVolume * 100}%`;
    });
    volumeUpBtn.addEventListener('click', () => {
        currentVolume = Math.min(1, currentVolume + 0.1);
        audioPlayer.volume = currentVolume;
        volumeBar.style.width = `${currentVolume * 100}%`;
    });
    volumeContainer.addEventListener('click', (event) => {
        const { width } = volumeContainer.getBoundingClientRect();
        const clickX = event.offsetX;
        const percent = (clickX / width);
        currentVolume = percent;
        audioPlayer.volume = currentVolume;
        volumeBar.style.width = `${currentVolume * 100}%`;
    });

    
    // =========================================================================
    // 10. LÓGICA DE BUSCA 
    // =========================================================================

    // "Ouve" o evento 'input' (cada vez que o usuário digita)
    searchBar.addEventListener('input', handleSearch);

    /**
     * Função: handleSearch 
     * Objetivo: Filtra MÚSICAS e ARTISTAS e mostra os resultados em seções separadas.
     */
    function handleSearch(event) {
        // 1. Pega o texto da busca e converte para minúsculo
        const query = event.target.value.toLowerCase(); 

        // 2. Se a busca estiver vazia...
        if (query.length === 0) {
            // CHAMA A FUNÇÃO PARA MOSTRAR OS POPULARES E ESCONDER A BUSCA
            showDefaultContent(); 
            return;
        }

        // 3. Se a busca NÃO estiver vazia...
        // CHAMA A FUNÇÃO PARA ESCONDER OS POPULARES E MOSTRAR A BUSCA
        showSearchResults(); 

        // 4. Cria "Mapas" separados para Músicas e Artistas (evita duplicatas)
        const foundSongs = new Map();
        const foundArtists = new Map();

        // 5. Procura nas Músicas
        musicsData.forEach(song => {
            if (song.name.toLowerCase().includes(query) || song.artist.toLowerCase().includes(query)) {
                foundSongs.set(song.name, song);
            }
        });

        // 6. Procura nos Artistas
        artistsData.forEach(artist => {
            if (artist.name.toLowerCase().includes(query)) {
                foundArtists.set(artist.name, artist);
            }
        });
        
        // 7. Procura nos Álbuns (SOMENTE para encontrar o ARTISTA)
        albumsData.forEach(album => {
            if (album.name.toLowerCase().includes(query) || album.artist.toLowerCase().includes(query)) {
                const artistFromAlbum = artistsData.find(a => a.name === album.artist);
                if (artistFromAlbum && !foundArtists.has(artistFromAlbum.name)) {
                    foundArtists.set(artistFromAlbum.name, artistFromAlbum);
                }
            }
        });

        // 8. Manda desenhar os resultados SEPARADOS na tela
        renderSearchResults(
            Array.from(foundSongs.values()), 
            Array.from(foundArtists.values())
        );
    }
    
    /**
     * Função: showDefaultContent (ESSENCIAL PARA A CORREÇÃO)
     * Objetivo: Mostra o conteúdo "Popular" e ESCONDE a busca (com animação).
     */
    function showDefaultContent() {
        // ESCONDE o container de busca
        searchResultsContainer.classList.add('hidden'); 
        // MOSTRA o container de "Populares"
        defaultContent.classList.remove('hidden'); 
        searchBar.value = ''; // Limpa a barra de busca
    }
    
    /**
     * Função: showSearchResults (ESSENCIAL PARA A CORREÇÃO)
     * Objetivo: MOSTRA a tela de busca e ESCONDE o conteúdo "Popular" (com animação).
     */
    function showSearchResults() {
        // ESCONDE o container de "Populares" (Artistas e Álbuns Populares)
        defaultContent.classList.add('hidden'); 
        // MOSTRA o container de busca
        searchResultsContainer.classList.remove('hidden'); 
    }


    // =========================================================================
    // 11. FUNÇÕES DE RENDERIZAÇÃO (Desenhar na Tela)
    // =========================================================================

    /**
     * Função: renderSearchResults 
     * Objetivo: Limpa e desenha os grids de MÚSICAS e ARTISTAS.
     * @param {Array} songs - Array de Músicas encontradas.
     * @param {Array} artists - Array de Artistas encontrados.
     */
    function renderSearchResults(songs, artists) {
        // 1. Limpa os grids de busca
        searchSongsGrid.innerHTML = ''; 
        searchArtistsGrid.innerHTML = '';
        
        const t = translations[currentLang];
        
        // 2. Verifica se AMBAS as listas estão vazias
        if (songs.length === 0 && artists.length === 0) {
            searchNoResultsMessage.innerText = `${t.searchNoResults} "${searchBar.value}"`;
            searchNoResults.classList.remove('hidden');
            // Esconde as seções de Músicas e Artistas
            searchResultsSongsSection.classList.add('hidden');
            searchResultsArtistsSection.classList.add('hidden');
            return; 
        }

        // 3. Se encontrou algo, esconde a mensagem de "Nenhum resultado"
        searchNoResults.classList.add('hidden');

        // 4. Renderiza as MÚSICAS
        if (songs.length > 0) {
            songs.forEach(song => {
                searchSongsGrid.appendChild(createSongListItem(song)); 
            });
            searchResultsSongsSection.classList.remove('hidden'); // Mostra a seção de Músicas
        } else {
            searchResultsSongsSection.classList.add('hidden'); // Esconde a seção
        }

        // 5. Renderiza os ARTISTAS
        if (artists.length > 0) {
            artists.forEach(artist => {
                searchArtistsGrid.appendChild(createArtistCard(artist)); 
            });
            searchResultsArtistsSection.classList.remove('hidden'); // Mostra a seção de Artistas
        } else {
            searchResultsArtistsSection.classList.add('hidden'); // Esconde a seção
        }
    }

    /**
     * Função: createSongListItem (NOVA FÁBRICA)
     * Objetivo: Cria e retorna um item de MÚSICA (formato de lista) para a busca.
     * (Baseado no CSS que criamos: .song-item)
     */
    function createSongListItem(song) {
        const songItem = document.createElement('div');
        songItem.className = 'song-item'; // Estilo de lista
        songItem.innerHTML = `
            <img src="${song.image}" alt="${song.name}">
            <div class="song-item-info">
                <h4>${song.name}</h4>
                <p>${song.artist}</p>
            </div>
            <button class="song-item-play-button" aria-label="Tocar ${song.name}">
                <i class="fa-solid fa-play"></i>
            </button>
        `;

        // Adiciona o clique para tocar a música
        songItem.addEventListener('click', () => {
            playArtistSong(song.artist, null, song); 
        });
        songItem.querySelector('.song-item-play-button').addEventListener('click', (e) => {
             e.stopPropagation(); 
             playArtistSong(song.artist, null, song);
        });
        return songItem;
    }
    
    /**
     * Função: createArtistCard (FÁBRICA DE CARD)
     * Objetivo: Cria e retorna um CARD de artista (Usado na home e na busca).
     */
    function createArtistCard(artist) {
        const artistCard = document.createElement('div');
        artistCard.classList.add('artist-card');
        artistCard.innerHTML = `
            <div class="card-image-container">
                <img src="${artist.image}" alt="${artist.name}">
                <div class="card-buttons-overlay">
                    <button class="btn-play"><i class="fa-solid fa-play"></i></button>
                </div>
            </div>
            <div class="card-info">
                <h3>${artist.name}</h3>
                <p>${translations[currentLang].cardArtistText}</p>
            </div>
        `;
        artistCard.querySelector('.btn-play').addEventListener('click', (e) => {
            e.stopPropagation();
            playArtistSong(artist.name); 
        });
        return artistCard;
    }

    /**
     * Função: createAlbumCard (FÁBRICA DE CARD)
     * Objetivo: Cria e retorna um CARD de álbum (Usado na home).
     */
    function createAlbumCard(album) {
        const albumCard = document.createElement('div');
        albumCard.classList.add('album-card');
        albumCard.innerHTML = `
            <div class="card-image-container">
                <img src="${album.image}" alt="${album.name}">
                <div class="card-buttons-overlay">
                    <button class="btn-add-song" title="${translations[currentLang].cardAddSongTitle}" aria-label="${translations[currentLang].cardAddSongTitle}">
                        <i class="fa-solid fa-plus"></i>
                    </button>
                    <button class="btn-play" aria-label="Tocar álbum ${album.name}"><i class="fa-solid fa-play"></i></button>
                </div>
            </div>
            <div class="card-info">
                <h3>${album.name}</h3>
                <p>${album.artist}</p>
            </div>
        `;
        albumCard.querySelector('.btn-play').addEventListener('click', (e) => {
            e.stopPropagation();
            playArtistSong(album.artist);
        });
        albumCard.querySelector('.btn-add-song').addEventListener('click', (e) => {
            e.stopPropagation();
            openMusicModalForAlbum(album); 
        });
        return albumCard;
    }

    /**
     * Função: renderArtists
     * Objetivo: Desenha a grade de "Artistas Populares" na tela.
     */
    function renderArtists() {
        popularArtistsGrid.innerHTML = ''; 
        artistsData.forEach(artist => {
            popularArtistsGrid.appendChild(createArtistCard(artist)); 
        }); 
    }

    /**
     * Função: renderAlbums
     * Objetivo: Desenha a grade de "Álbuns Populares" na tela.
     */
    function renderAlbums() {
        popularAlbumsGrid.innerHTML = ''; 
        albumsData.forEach(album => {
            popularAlbumsGrid.appendChild(createAlbumCard(album));
        });
    }

    /**
     * Função: renderPlaylists
     * Objetivo: Desenha a lista de playlists do usuário na sidebar.
     */
    function renderPlaylists() {
        userPlaylistsList.innerHTML = ''; 
        playlistsData.forEach(playlist => {
            const playlistItem = document.createElement('p');
            playlistItem.className = 'sidebar-playlist-item';
            playlistItem.textContent = playlist.name;
            playlistItem.addEventListener('click', () => {
                playPlaylist(playlist);
            });
            userPlaylistsList.appendChild(playlistItem);
        });
    }

    /**
     * Função: renderAllSongsInModal
     * Objetivo: Preenche o modal de "Criar Playlist" com todas as músicas.
     */
    function renderAllSongsInModal() {
        playlistSongList.innerHTML = ''; 
        musicsData.forEach((song, index) => {
            const songItem = document.createElement('div');
            songItem.className = 'playlist-song-item';
            songItem.innerHTML = `
                <input type="checkbox" id="song-check-${index}" data-song-index="${index}">
                <label for="song-check-${index}">${song.name} - ${song.artist}</label>
            `;
            playlistSongList.appendChild(songItem);
        });
    }

    
    // =========================================================================
    // 12. LÓGICA DE CONTROLE DOS MODAIS (Pop-ups)
    // =========================================================================
    // (Esta seção não precisava de NENHUMA alteração)

    homeButton.addEventListener('click', showDefaultContent); // Botão "Início"
    addArtistBtn.addEventListener('click', () => artistModal.classList.add('active'));
    addAlbumBtn.addEventListener('click', () => albumModal.classList.add('active'));
    
    createPlaylistBtn.addEventListener('click', () => {
        renderAllSongsInModal(); 
        playlistModal.classList.add('active');
    });

    /**
     * Função: closeModal
     * Objetivo: Fecha QUALQUER modal e limpa seu formulário.
     */
    function closeModal(modal) {
        modal.classList.remove('active'); 
        if (modal === musicModal) {
            resetMusicModal();
        } else if (modal === artistModal) {
            artistForm.reset();
        } else if (modal === albumModal) {
            albumForm.reset();
        } else if (modal === playlistModal) {
            playlistForm.reset();
        }
    }
    
    musicModalClose.addEventListener('click', () => closeModal(musicModal));
    albumModalClose.addEventListener('click', () => closeModal(albumModal));
    artistModalClose.addEventListener('click', () => closeModal(artistModal));
    playlistModalClose.addEventListener('click', () => closeModal(playlistModal));
    
    musicModal.addEventListener('click', (e) => { if (e.target === musicModal) closeModal(musicModal); });
    albumModal.addEventListener('click', (e) => { if (e.target === albumModal) closeModal(albumModal); });
    artistModal.addEventListener('click', (e) => { if (e.target === artistModal) closeModal(artistModal); });
    playlistModal.addEventListener('click', (e) => { if (e.target === playlistModal) closeModal(playlistModal); });

    /**
     * Função: openMusicModalForAlbum
     * Objetivo: Abre o modal de música no modo "Adicionar ao Álbum".
     */
    function openMusicModalForAlbum(album) {
        const t = translations[currentLang];
        musicModalTitle.textContent = `${t.musicModalTitleAlbum} ${album.name}`;
        
        musicArtistGroup.classList.add('hidden');
        musicImageGroup.classList.add('hidden');

        musicForm.dataset.artist = album.artist;
        musicForm.dataset.image = album.image;
        
        musicModal.classList.add('active'); 
    }

    /**
     * Função: resetMusicModal
     * Objetivo: Restaura o modal de música ao seu estado original.
     */
    function resetMusicModal() {
        musicForm.reset(); 
        delete musicForm.dataset.artist; 
        delete musicForm.dataset.image;
        musicModalTitle.textContent = translations[currentLang].musicModalTitleDefault;
        musicArtistGroup.classList.remove('hidden');
        musicImageGroup.classList.remove('hidden');
    }

    
    // =========================================================================
    // 13. LÓGICA DE ENVIO DOS FORMULÁRIOS
    // =========================================================================
    // (Esta seção não precisava de NENHUMA alteração)
    
    /**
     * Função: showToast
     * Objetivo: Mostra uma notificação pop-up (substitui o 'alert()').
     */
    function showToast(message) {
        toastNotification.textContent = message; 
        toastNotification.classList.add('show'); 

        setTimeout(() => {
            toastNotification.classList.remove('show');
        }, 3000);
    }

    // "Ouvinte" de envio (submit) do formulário de MÚSICA
    musicForm.addEventListener('submit', (event) => {
        event.preventDefault(); 
        const t = translations[currentLang];

        const audioFileInput = document.getElementById('music-audio-file');
        const audioFile = audioFileInput.files[0];

        if (!audioFile) {
            showToast(t.alertNoAudio);
            return; 
        }
        
        const audioUrl = URL.createObjectURL(audioFile);

        const prefilledArtist = musicForm.dataset.artist;
        const prefilledImage = musicForm.dataset.image;

        const newSong = {
            name: document.getElementById('music-name').value,
            audio: audioUrl,
            artist: prefilledArtist || document.getElementById('music-artist').value,
            image: prefilledImage || document.getElementById('music-image').value,
            duration: "?:??" 
        };

        musicsData.push(newSong); 
        closeModal(musicModal); 
        showToast(t.alertSongSuccess);
    });

    // "Ouvinte" de envio (submit) do formulário de ÁLBUM
    albumForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const t = translations[currentLang];

        const imageFileInput = document.getElementById('album-image-file');
        const imageFile = imageFileInput.files[0];

        if (!imageFile) {
            showToast(t.alertNoImage);
            return;
        }

        const imageUrl = URL.createObjectURL(imageFile); 

        const newAlbum = {
            name: document.getElementById('album-name').value,
            artist: document.getElementById('album-artist').value,
            image: imageUrl 
        };

        albumsData.push(newAlbum); 
        closeModal(albumModal);
        renderAlbums(); 
        showToast(t.alertAlbumSuccess);
    });

    // "Ouvinte" de envio (submit) do formulário de ARTISTA
    artistForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const t = translations[currentLang];

        const imageFileInput = document.getElementById('artist-image-file');
        const imageFile = imageFileInput.files[0];

        if (!imageFile) {
            showToast(t.alertNoImage);
            return;
        }

        const imageUrl = URL.createObjectURL(imageFile); 

        const newArtist = {
            name: document.getElementById('artist-name').value,
            image: imageUrl
        };

        artistsData.push(newArtist); 
        closeModal(artistModal);
        renderArtists(); 
        showToast(t.alertArtistSuccess);
    });

    // "Ouvinte" de envio (submit) do formulário de PLAYLIST
    playlistForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const t = translations[currentLang];

        const playlistName = document.getElementById('playlist-name').value;
        const selectedSongCheckboxes = document.querySelectorAll('#playlist-song-list input[type="checkbox"]:checked');
        const selectedSongs = [];
        
        selectedSongCheckboxes.forEach(checkbox => {
            const songIndex = parseInt(checkbox.dataset.songIndex, 10);
            selectedSongs.push(musicsData[songIndex]);
        });

        const newPlaylist = {
            id: Date.now(),
            name: playlistName,
            songs: selectedSongs
        };

        playlistsData.push(newPlaylist);
        closeModal(playlistModal);
        renderPlaylists();
        showToast(t.alertPlaylistSuccess);
    });
    
    // =========================================================================
    // 14. INICIALIZAÇÃO DA APLICAÇÃO
    // =========================================================================
    /**
     * Esta é a primeira função que roda.
     * Ela inicia a aplicação definindo o idioma inicial e
     * chamando as funções 'render' para desenhar o estado inicial
     * (Artistas e Álbuns Populares).
     */
    updateLanguage(currentLang);
    
    // Garante que a tela de busca comece ESCONDIDA
    // e a tela principal comece VISÍVEL.
    searchResultsContainer.classList.add('hidden');
    defaultContent.classList.remove('hidden');


}); // Fim do 'DOMContentLoaded'