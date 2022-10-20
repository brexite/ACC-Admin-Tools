import { Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser'

@Injectable({
  providedIn: 'root'
})
export class SeoService {

  constructor(private meta: Meta, private titleService: Title) { }

  generateTags(tags) {
    // default values
    tags = {
      title: 'ACC ADM.IN',
      description: 'Useful ACC server hosting tools',
      image: 'https://firebasestorage.googleapis.com/v0/b/acc-admin-tools.appspot.com/o/Thumbnail.png?alt=media',
      slug: '',
      ...tags
    }

    this.titleService.setTitle(tags.title);

    //Set meta tags
    this.meta.updateTag({ name: 'twitter:card', content: 'summary'});
    this.meta.updateTag({ name: 'twitter:site', content: '@brexite'});
    this.meta.updateTag({ name: 'twitter:title', content: tags.title});
    this.meta.updateTag({ name: 'twitter:description', content: tags.description});
    this.meta.updateTag({ name: 'twitter:image', content: tags.image});

    this.meta.updateTag({ name: 'og:type', content: 'article'});
    this.meta.updateTag({ name: 'og:site_name', content: 'ACC Adm.in'});
    this.meta.updateTag({ name: 'og:title', content: tags.title});
    this.meta.updateTag({ name: 'og:description', content: tags.description});
    this.meta.updateTag({ name: 'og:image', content: tags.image});
    this.meta.updateTag({ name: 'og:url', content: 'https://accadm.in/'});
  }

  

}
