Vue.component('artiste', {

    template:
    `<p v-on:click="getArtisteById(data.id, data.name)" class="btn btn-primary">Voir les albums</p>`,

    props: ['data'],
    methods: {
        getArtisteById(id, name){
            
            let url = `http://musicbrainz.org/ws/2/artist/${id}?inc=release-groups&type=album&fmt=json`;
            this.$emit('reset-col-singles');
            
            axios.get(url)
                .then(res => {
                    console.log(res);
                    
                    this.$emit('new-album', res);
                    this.$emit('set-artiste', name);
                })
                .catch(error => {
                    console.log('Erreur artiste: ' + error);
                })
        }       
    }
})