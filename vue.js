let app = new Vue({
    el: '#app',
    data:{
        input: "",
        artistesData: "",
        albumData: "",
        albumSingle: "",
        selection: "Artiste",
        selectedAlbum: "",
        selectedArtiste: "",
        image: "",
        loading: false
    },

    methods: {
        
        //Recherche les artistes en fonction de la donnée de l'utilisateur
        rechercheArtistes(){
            if(this.input){
                let url = 'http://musicbrainz.org/ws/2/artist/?query=artist:' + this.input + '&fmt=json';

                axios.get(url)
                    .then(res => {
                        this.artistesData = res;
                    })
                    .catch(error => {
                        console.log(error);
                    })
            }
        },


        //Recherche les albums en fonction de la donnée de l'utilisateur
        rechercheAlbum(){
            if(this.input){
                let url = 'http://musicbrainz.org/ws/2/release-group/?query=release:' + this.input + '&fmt=json';

                axios.get(url)
                    .then(res => {
                        this.albumData = res
                        console.log(this.albumData);
                        
                    })
                    .catch(error => {
                        console.log(error);
                    })
            }
        },

        //Recherche des musiques en fonction de la donnée de l'utilisateur
        rechercheSingle(){
            if(this.input){
                let url = 'http://musicbrainz.org/ws/2/recording/?query=recording:' + this.input + '&fmt=json';

                axios.get(url)
                    .then(res => {
                        
                        this.albumSingle = res
                    })
                    .catch(error => {
                        console.log(error);
                    })
            }
        },

        //Si Artiste est selectionné, lance la recherche pour les artistes, etc..
        search(){

            if(this.selection == "Artiste"){
                this.albumData = "";
                this.albumSingle = "";
                this.rechercheArtistes();

            }else if(this.selection == "Album"){
                this.artistesData = "";
                this.albumSingle = "";
                this.rechercheAlbum();
            }else if(this.selection == "Single"){
                this.artistesData = "";
                this.albumData = ""
                this.rechercheSingle();
            }
        },

        //Permet de changer les informations des singles lorsque l'utilisateur clique sur un nouvel album

        setNewAlbum(selectedAlbum){
            if(this.selectedAlbum != selectedAlbum){
                this.selectedSingle = ""
            }
            this.selectedAlbum = selectedAlbum;
        },

        //Permet de changer les informations de l'album/single lorsque l'utilisateur clique sur un nouvel artiste
        setNewArtiste(selectedArtiste){
            
            if (this.selectedArtiste != selectedArtiste){
                this.selectedAlbum = null;
                this.selectedSingle = null;
            }
            this.selectedArtiste = selectedArtiste;
        },

        //Met à jour les données de l'album
        changeDataAlbum(albums){
            this.selectedAlbum = "";
            this.albumData = albums;
        },

        //Met à jour les données de l'album
        changeDataSingles(singles){
            this.albumSingle = singles;
        },

        //Enlève la colonne singles si on refait une recherche
        resetSingleColonne(){
            this.albumSingle = "";
        },

        //Cette methode permet de récuperer l'ID d'un album
        getCover(releaseID){

            let url = `http://coverartarchive.org/release/${releaseID}/`;
            axios.get(url)
                .then(res => {
                    this.image = res.data.images[0].thumbnails.small;
                })
                .catch(err => {
                    console.log("Erreur cover: " + err);
                })
                .finally(() => {
                    this.loading = false
                })
        },


    }
})