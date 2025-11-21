import { getTestBed } from '@angular/core/testing';
import { provideHttpClientTesting } from '@angular/common/http/testing';

getTestBed().configureTestingModule({
  providers: [provideHttpClientTesting()],
});
