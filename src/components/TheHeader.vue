<template>
  <header id="header">
    <div id="cover"></div>
    <div class="container">
      <div class="title">
        <h2><b>李文祥·个人博客</b></h2>
        September Dream of the end of summer
      </div>
    </div>
  </header>
</template>

<style lang="stylus" scoped>
@font-face {
  font-family: '华文行楷';
  src: url('../assets/fonts/STXINGKA.woff');
}

#header {
  position: relative;
  width: 100%;
  height: 26vmin;
  background: url('../assets/images/blacksky.jpg');
  background-size: 100% 100%;
  font-size: 1.4rem;
  font-family: '华文行楷';
  color: #2196f3;
  padding-top: 10vmin;
}

#cover {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  // background: linear-gradient(to bottom, #2196f3 0%, #ffffff 70%);
  opacity: 0.3;
}

.title {
  position: relative;
  z-index: 2;

  h2 {
    margin-bottom .5em
  }
}

@media (max-width: 720px) {
  #header {
    font-size: 1rem;
  }
}

@media (max-width: 375px) {
  #header {
    font-size: .85rem;
  }
}
</style>
