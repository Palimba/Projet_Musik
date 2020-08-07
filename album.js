Vue.component('album', {

    template:
    `<h6 v-on:click="getAlbumById(data.id, data.title)" class="card-title">{{data.title}}</h6>`,

    props: ['data'],
    methods: {
        getAlbumById(id, title){
            this.$emit('load');
            let url = `http://musicbrainz.org/ws/2/release-group/${id}?inc=releases&fmt=json`;

            
            axios.get(url)
                .then(res => {

                    newId = res.data.releases[0].id
                    let url2 = `https://musicbrainz.org/ws/2/release/${newId}?fmt=json&inc=recordings`;
                    axios.get(url2)
                        .then(res => {
                            console.log(res);
                            
                            this.$emit('new-singles', res);
                            this.$emit('cover', newId);
                            this.$emit('set-album', title);
                        }).catch(e => {
                            console.log(e);
                        })

                })
                .catch(error => {
                    this.$emit('Erreur', error);
                }).finally(() => {
                        this.$emit('stop-load');
                    })
        }       
    }
})