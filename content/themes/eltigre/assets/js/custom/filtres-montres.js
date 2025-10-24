const { createApp } = Vue;

const FiltresMontresApp = {
    data() {
        return {
            filters: {
                marques: [],
                genre: [],
                prix: [],
                annee: [],
                taille: []
            },
            filterOptions: {
                marques: [],
                genre: [],
                prix: [],
                annee: [],
                taille: []
            },
            montres: [],
            loading: false,
            showFilters: true,
            layout: 'listing',
            ajaxUrl: '',
            nonce: ''
        };
    },
    
    computed: {
        activeFiltersCount() {
            return Object.values(this.filters).reduce((sum, arr) => sum + arr.length, 0);
        }
    },
    
    async mounted() {
        const el = document.getElementById('app-filtres-montres');
        this.ajaxUrl = el.dataset.ajaxUrl;
        this.nonce = el.dataset.nonce;
        this.layout = el.dataset.layout || 'listing';
        
        await this.loadFilterOptions();
        await this.loadMontres();
    },
    
    methods: {
        async loadFilterOptions() {
            try {
                const formData = new FormData();
                formData.append('action', 'get_filter_options');
                formData.append('nonce', this.nonce);
                
                const response = await fetch(this.ajaxUrl, {
                    method: 'POST',
                    body: formData
                });
                
                const data = await response.json();
                
                if (data.success) {
                    this.filterOptions = data.data;
                }
            } catch (error) {
                console.error('Erreur chargement options:', error);
            }
        },
        
        async loadMontres() {
            this.loading = true;
            
            try {
                const formData = new FormData();
                formData.append('action', 'filter_montres');
                formData.append('nonce', this.nonce);
                formData.append('filters', JSON.stringify(this.filters));
                
                const response = await fetch(this.ajaxUrl, {
                    method: 'POST',
                    body: formData
                });
                
                const data = await response.json();
                
                if (data.success) {
                    this.montres = data.data.montres;
                }
            } catch (error) {
                console.error('Erreur filtrage:', error);
            } finally {
                this.loading = false;
            }
        },
        
        async applyFilters() {
            await this.loadMontres();
        },
        
        resetFilters() {
            this.filters = {
                marques: [],
                genre: [],
                prix: [],
                annee: [],
                taille: []
            };
            this.loadMontres();
        },
        
        toggleFilters() {
            this.showFilters = !this.showFilters;
        }
    },
    
    template: `
        <div class="filtres-montres">
            <!-- Barre de filtres mobile -->
            <div class="filtres-header">
                <button @click="toggleFilters" class="btn-toggle-filters">
                    <span>Filtres</span>
                    <span v-if="activeFiltersCount" class="filters-count">({{ activeFiltersCount }})</span>
                </button>
                <button v-if="activeFiltersCount" @click="resetFilters" class="btn-reset">
                    Réinitialiser
                </button>
            </div>

            <!-- Sidebar des filtres -->
            <div class="filtres-sidebar" :class="{ 'is-open': showFilters }">
                <div class="filtres-sidebar__inner">
                    <h3>Filtrer par</h3>
                    
                    <!-- Marques -->
                    <div v-if="filterOptions.marques.length" class="filter-group">
                        <h4>Marques</h4>
                        <div class="filter-checkboxes">
                            <label v-for="option in filterOptions.marques" :key="option.value">
                                <input 
                                    type="checkbox" 
                                    :value="option.value"
                                    v-model="filters.marques"
                                    @change="applyFilters"
                                />
                                <span>{{ option.label }}</span>
                            </label>
                        </div>
                    </div>

                    <!-- Genre -->
                    <div v-if="filterOptions.genre.length" class="filter-group">
                        <h4>Genre</h4>
                        <div class="filter-checkboxes">
                            <label v-for="option in filterOptions.genre" :key="option.value">
                                <input 
                                    type="checkbox" 
                                    :value="option.value"
                                    v-model="filters.genre"
                                    @change="applyFilters"
                                />
                                <span>{{ option.label }}</span>
                            </label>
                        </div>
                    </div>

                    <!-- Prix -->
                    <div class="filter-group">
                        <h4>Prix</h4>
                        <div class="filter-checkboxes">
                            <label v-for="option in filterOptions.prix" :key="option.value">
                                <input 
                                    type="checkbox" 
                                    :value="option.value"
                                    v-model="filters.prix"
                                    @change="applyFilters"
                                />
                                <span>{{ option.label }}</span>
                            </label>
                        </div>
                    </div>

                    <!-- Année -->
                    <div class="filter-group">
                        <h4>Année</h4>
                        <div class="filter-checkboxes">
                            <label v-for="option in filterOptions.annee" :key="option.value">
                                <input 
                                    type="checkbox" 
                                    :value="option.value"
                                    v-model="filters.annee"
                                    @change="applyFilters"
                                />
                                <span>{{ option.label }}</span>
                            </label>
                        </div>
                    </div>

                    <!-- Taille -->
                    <div class="filter-group">
                        <h4>Taille du boîtier</h4>
                        <div class="filter-checkboxes">
                            <label v-for="option in filterOptions.taille" :key="option.value">
                                <input 
                                    type="checkbox" 
                                    :value="option.value"
                                    v-model="filters.taille"
                                    @change="applyFilters"
                                />
                                <span>{{ option.label }}</span>
                            </label>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Résultats -->
            <div class="montres-results">
                <div v-if="loading" class="loading">
                    <div class="spinner"></div>
                    <p>Chargement...</p>
                </div>
                
                <div v-else-if="montres.length === 0" class="no-results">
                    <p>Aucune montre trouvée avec ces filtres</p>
                </div>
                
                <div v-else class="montres-grid" :class="'layout-' + layout">
                    <div v-for="montre in montres" :key="montre.id" class="watch">
                        <a :href="montre.permalink" target="_blank">
                            <div class="watch__image" v-html="montre.image"></div>
                            <div class="watch__title">{{ montre.title }}</div>
                            <div v-if="montre.price" class="watch__price">{{ montre.price }}&nbsp;€</div>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    `
};

// Initialiser l'app quand le DOM est prêt
document.addEventListener('DOMContentLoaded', () => {
    const appElement = document.getElementById('app-filtres-montres');
    if (appElement) {
        createApp(FiltresMontresApp).mount('#app-filtres-montres');
    }
});
