import Vue from 'vue'
import SearchButton from './SearchButton.vue'

SearchButton.install = function (V, options) {
    V.component(SearchButton.name, SearchButton);
};

export default SearchButton