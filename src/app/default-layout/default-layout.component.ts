import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-default-layout',
  templateUrl: './default-layout.component.html',
  styleUrls: ['./default-layout.component.css']
})
export class DefaultLayoutComponent {
  currentPath: string = '';

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.url.subscribe(urlSegments => {
      // urlSegments là một mảng chứa các phần của đường dẫn (ví dụ: ['settings'] hoặc ['payment'])
      // Chúng ta chỉ quan tâm đến phần đầu tiên nếu có
      if (urlSegments.length > 0) {
        this.currentPath = urlSegments[0].path;
      } else {
        // Nếu không có phần tử nào, có thể đang ở đường dẫn gốc
        this.currentPath = '';
      }
    });
  }
}
