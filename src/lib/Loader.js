const Loader = {
    showLoader()  {
        document.getElementById('loader').classList.add('active')
    },

    hideLoader()  {
        document.getElementById('loader').classList.remove('active')
    }
}

export default Loader;
