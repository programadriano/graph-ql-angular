import { Component, OnInit, OnDestroy } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { Subscription } from 'apollo-client/util/Observable';

// We use the gql tag to parse our query string into a query document
const CurrentUserForProfile = gql`
  query  {
      produtos{
      nome,
      preco,
      codigoBarras
    }
  }
`;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  produtos = new Array<Produto>();

  ngOnDestroy() {
    this.querySubscription.unsubscribe();
  }
  ngOnInit() {
    this.querySubscription = this.apollo.watchQuery<any>({
      query: CurrentUserForProfile
    })
      .valueChanges
      .subscribe(({ data }) => {
        this.produtos.push(data.produtos);
        console.log(this.produtos);
      });
  }

  title = 'GraphQL-angular';

  private querySubscription: Subscription;

  constructor(private apollo: Apollo) { }
}
