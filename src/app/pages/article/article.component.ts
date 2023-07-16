import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { PageQuery, PageReqult } from 'src/app/common/page';

interface ArticleSearchForm extends PageQuery {
  title: string,
  column: string,
}

type ArticleContent = {
  id: number,
  title: string,
  column: string,
  author: string,
  createTime: Date,
  content: string,
}

@Component({
  selector: 'app-welcome',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent {
  constructor(
    private fb: FormBuilder,
    private http: HttpClient) {
  }

  isVisible: boolean = false;

  pageInfo: PageQuery = {
    page: 1,
    limit: 3,
  }
  searchForm = this.fb.group({
    title: ["", [Validators.maxLength(10)]],
    column: ["", []],
  });
  dataList: ArticleContent[] = [];
  total: number = 0;
  validateForm = new FormGroup<ArticleContent | any>({
    id: new FormControl<number>(0, Validators.required),
    title: new FormControl<string>("", [Validators.required, Validators.maxLength(10)]),
    author: new FormControl<string>("", Validators.required),
    createTime: new FormControl<Date>(new Date(), Validators.required),
    content: new FormControl<string>("", Validators.required),
  });

  ngOnInit() {
    this.search(true);
  }

  onQueryParamsChange(params: NzTableQueryParams) {
    const { pageSize, pageIndex } = params;
    this.pageInfo.page = pageIndex;
    this.pageInfo.limit = pageSize;
    this.search();
  }

  search(isPage1: boolean = false) {
    if (isPage1) {
      this.pageInfo.page = 1;
    }
    const searchData: ArticleSearchForm = {
      ...this.searchForm.value,
      ...this.pageInfo,
    } as ArticleSearchForm;
    this.http.get<PageReqult<ArticleContent>>("/assets/article.json", {
      params: {
        ...searchData,
      },
    }).subscribe((data: PageReqult<ArticleContent>) => {
      this.dataList = data.rows;
      this.total = data.total;
    });
  }

  edit(id: number) {
    this.isVisible = true;
    return this.http.get<ArticleContent>("/assets/article1.json", {
      params: {
        id,
      }
    }).subscribe((data: ArticleContent) => {
      this.validateForm.setValue(data);
    });
  }

  save(): void {
    if (!this.validateForm.valid) {
      return;
    }
    const formData: ArticleContent = this.validateForm.value;
    this.http.post("/assets/article1.json", formData)
      .subscribe(res => {
        console.log(res);
        this.isVisible = true;
      });
  }

  delete(id: number) {
    this.http.delete("/assets/article/" + id).subscribe(res => {
      console.log(res);
    });
  }
}
